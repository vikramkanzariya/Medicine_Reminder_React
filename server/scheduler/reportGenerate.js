const cron = require("node-cron");
const { getUsers } = require("../repositories/user.repository");
const {reportQueue} = require("../config/redis");
require("dotenv").config();

const generateReport = async () => {
  cron.schedule("0 10 * * Sun", async () => {
    const users = await getUsers();

    for (let user of users) {
      await reportQueue.add("sendReport",user)
    }
  });
};

module.exports = generateReport;
