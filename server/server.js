const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const router = require("./routes/index.route");
const scheduleCron= require("./scheduler/taskScheduler")
const generateReport = require('./scheduler/reportGenerate')
const { cloudinaryConnect } = require("./config/cloudinary");
const {reportWorker,reminderWorker} = require('./scheduler/worker')

scheduleCron();
generateReport();
// Load environment variables from .env file
config({ path: `.env` });

const app = express();

// passport configuration
const passport = require("passport");
const { passportConfig } = require("./middlewares/auth.middleware");
const cookieParser = require("cookie-parser");
passportConfig(passport);

/**
 * Basic Configuration
 */
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

/**
 * Routes Configuration
 */
app.use("/", router);

/**
 * Spinning up server
 */
const PORT = process.env.API_PORT || 3000; // Default port is 3000 if API_PORT is not defined
  app.listen(PORT, () => {
    console.log("=================================");
    console.log(`🚀 App listening on the port ${PORT}`);
    console.log("=================================");
  });

reportWorker.on('completed', job => {
  console.log(`Report: ${job.id} has completed!`);
});

reminderWorker.on('completed', job => {
  console.log(`reminder: ${job.id} has completed!`);
});

cloudinaryConnect();
