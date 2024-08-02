const express = require("express");
const {
  user,
  login,
  getUser,
  updateUser,
  logout,
  logoutFromAll,
} = require("../controllers/user.controller");
const router = express.Router();
const passport = require("passport");
const { addMedication, getMedicationOfUser, markAsDone, medicationById, updateMedication, getReports, deleteMedication } = require("../controllers/medication.controller");

router.use(passport.authenticate('jwt',{session:false}));

router.route('/add')
.post(addMedication)

router.route("/")
.get(getMedicationOfUser)


router.route("/done")
.get(markAsDone)

router.route('/reports')
.get(getReports)

router.route("/:id")
.get(medicationById)
.put(updateMedication)
.delete(deleteMedication)

module.exports = router