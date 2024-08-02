const cron = require("node-cron");
const { getMedication } = require("../repositories/medication.repository");
const { taskQueue } = require("../config/redis");

const scheduleCron = async () => {
  cron.schedule("*/5 * * * *", async () => {
    const scheduleDailyReminder = (medication) => {
      const [hour, minute] = medication.time.split(":");

      cron.schedule(`5 ${minute} ${hour} * * *`, async () => {
        await taskQueue.add("sendReminder", medication);
      });
    };

    const dayNameToNumber = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const scheduleWeeklyReminder = (medication) => {
      const [hour, minute] = medication.time.split(":");
      const dayOfWeek = dayNameToNumber[medication.day_of_week];

      if (dayOfWeek === undefined) {
        console.error(`Invalid dayOfWeek: ${medication.day_of_week}`);
        return;
      }

      cron.schedule(`5 ${minute} ${hour} * * ${dayOfWeek}`, async () => {
        await taskQueue.add("sendReminder", medication);
      });
    };

    const scheduleMedication = async () => {
      try {
        const medications = await getMedication();
        console.log(medications);
        medications.forEach(async (medication) => {
          if (medication.frequency === "daily") {
            scheduleDailyReminder(medication);
          } else if (medication.frequency === "weekly") {
            scheduleWeeklyReminder(medication);
          } else if (medication.frequency === null) {
            const date = new Date(medication.start_date);
            const [hour, minute] = medication.time.split(":");
            const month = date.getMonth();
            const day = date.getDate();
            cron.schedule(
              `5 ${minute} ${hour} ${day} ${month + 1} *`,
              async () => {
                await taskQueue.add("sendReminder", medication);
              }
            );
          }
        });
      } catch (error) {
        console.error(`Failed to schedule medications: ${error.message}`);
      }
    };

    // setInterval(scheduleMedication,60*1000);
    scheduleMedication();
  });
};

module.exports = scheduleCron;
