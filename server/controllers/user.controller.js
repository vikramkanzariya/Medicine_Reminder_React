const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const {
  getUser,
  createUser,
  createSession,
  deleteSession,
  deleteAllSessionById,
  deleteSessions,
} = require("../repositories/user.repository");
const db = require("../models");

exports.user = async (req, res) => {
  try {
    let { fname, lname, email, password, confirmPassword } = req.body;

    if (
      !fname.trim() ||
      !lname.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password doesn't match !",
      });
    }

    let data = await getUser(email);

    if (data) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    let hashPassword;
    try {
      let salt = bcrypt.genSaltSync(10);
      hashPassword = bcrypt.hashSync(password, salt);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const user = await createUser({
      first_name: fname,
      last_name: lname,
      email,
      password: hashPassword,
      role_id: 1,
    });

    return res.json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await getUser(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email or password invalid",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: false,
        message: "email or password doesn't match",
      });
    }

    let payload = {
      id: user.id,
      role_id: user.role_id,
      email: user.email,
    };

    let token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });

    const session = await createSession({
      user_id: user.id,
      session_token: token,
      ip_address: req.ip,
      device_type: req.headers["user-agent"],
    });

    return res
      .cookie("token", token, {
        maxAge: 4 * 24 * 60 * 60 * 1000,
        expires:new Date(Date.now() + ( 4 * 24 * 60 * 60 * 1000)),
        httpOnly: true,
      })
      .json({
        success: true,
        user: user,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : below 2 controller are pending
exports.getUser = async (req, res) => {
  try {
    // let id = req.user.id;
    // let user = await getUserById(id);

    // if (!user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "404 BAD Request",
    //   });
    // }

    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let { fname, lname } = req.body;
    let id = req.user.id;
    let profile = req.file;

    let user = await getUserById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    await user.update({ fname: fname, lname: lname });
    let profilePicture = await getProfileById(id);

    if (profile && profile.filename) {
      await profilePicture.update({ is_active: 0 });
      await createProfile({
        filename: profile.filename,
        path: profile.path,
        user_id: id,
      });
    }

    user = await getUserById(id);

    return res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await deleteSession(req.token);

    res.clearCookie("token");

    return res.json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutFromAll = async (req, res) => {
  try {
    res.clearCookie("token");
    await deleteAllSessionById(req.user.id);
    return res.json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutFromOther = async(req,res)=>{
  try {
    const userId = req.user.id;
    const currentToken = req.token;
    console.log(req)

    const deleteSession = await deleteSessions(userId,currentToken);

    return res.json({
      success:true,
      message:"logout from other successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.currentUser = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};
