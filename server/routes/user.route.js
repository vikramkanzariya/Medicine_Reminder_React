const express = require("express");
const {
  user,
  login,
  getUser,
  updateUser,
  logout,
  logoutFromAll,
  currentUser,
  logoutFromOther,
} = require("../controllers/user.controller");
const router = express.Router();
const passport = require("passport");

router.route("/register").post(user);

router.route("/login").post(login);

router
  .route("/user")
  .get(passport.authenticate("jwt", { session: false }), getUser);

router
  .route("/update")
  .put(
    passport.authenticate("jwt", { session: false }),
    updateUser
  );
 
router.route('/logout')
.get(passport.authenticate('jwt',{session:false}),logout)  

router.route('/logout/all')
.get(passport.authenticate('jwt',{session:false}),logoutFromAll)  

router.route('/logout/other')
.get(passport.authenticate('jwt',{session:false}),logoutFromOther)  

router.route("/currentUser")
.get(passport.authenticate("jwt",{session:false}),currentUser)

module.exports = router;
