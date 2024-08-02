const dotenv = require("dotenv");
const { getUserWithSession, getSession } = require("../repositories/user.repository");
const jwtStrategy = require("passport-jwt").Strategy;
dotenv.config();

// getToken function for passport
const getToken = (req) => {
  return (
    req.cookies?.token ||
    req.body?.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    null
  );
};

// opts for passport-jwt
let opts = {
  jwtFromRequest: getToken,
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
};

// passport-jwt configuration logic
exports.passportConfig = (passport) => {
  passport.use(
    new jwtStrategy(opts, async (req, payload, next) => {

      req.token = getToken(req);
      const session = await getSession(req.token);

      if(!session){
       return next(null,false);
      }

      const user = await getUserWithSession(payload.id);

      if (!user) {
        return next(null, false);
      }
      // if user present then call next with payload
      return next(null, user);
    })
  );
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role_id !== 3) {
    return res.status(403).json({
      success: false,
      message: "Access forbidden: Admins only",
    });
  }
  next();
};
