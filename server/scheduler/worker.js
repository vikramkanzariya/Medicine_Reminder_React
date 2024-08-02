const { Worker } = require("bullmq");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");
const {
  getReportByUser,
  getSingleMedication,
  getWeeklyMedications,
  createReport,
  createMedicationLog,
} = require("../repositories/medication.repository");
const { uploadCSVToCloudinary } = require("../services/fileUploader");
const mailSender = require("../services/mailSender");
const { weeklyReportEmail } = require("../template/report");
const fs = require("fs");
const { reportQueue, taskQueue } = require("../config/redis");
const { getUserById } = require("../repositories/user.repository");
const { medicineReminderEmail } = require("../template/medicineReminder");
require("dotenv").config();

const reportWorker = new Worker(
  "sendReport",
  async (job) => {
    try {
      const user = job.data;

      let lastReportDate;
      const lastLog = await getReportByUser(user.id);

      if (lastLog) {
        lastReportDate = lastLog.report_date;
      } else {
        const firstMedication = await getSingleMedication(user.id);

        if (firstMedication) {
          lastReportDate = firstMedication.createdAt;
        } else {
          console.log("No medication records found.");
          return;
        }
      }

      const nextReportDate = new Date(Date.now() - (24*60*60*1000));

      const medications = await getWeeklyMedications(
        user.id,
        lastReportDate,
        nextReportDate
      );
      console.log(medications);

      if (medications.length > 0) {
        const records = medications.map((medication) => ({
          name: medication.name,
          description: medication.description,
          start_date: medication.start_date,
          end_date: medication.end_date,
          type: medication.type,
          frequency: medication.frequency,
          day_of_week: medication.day_of_week,
          time: medication.time,
          status: medication["medication_logs.status"],
        }));

        const reportPath = path.join(
          __dirname,
          `./uploads/medication_report_${user.id}_${
            nextReportDate.toISOString().split("T")[0]
          }.csv`
        );

        // Initialize CSV writer
        const csvWriter = createCsvWriter({
          path: reportPath,
          header: [
            { id: "name", title: "Name" },
            { id: "description", title: "Description" },
            { id: "start_date", title: "Start Date" },
            { id: "end_date", title: "End Date" },
            { id: "type", title: "Type" },
            { id: "frequency", title: "Frequency" },
            { id: "day_of_week", title: "Day of Week" },
            { id: "time", title: "Time" },
            { id: "status", title: "Status" },
          ],
        });

        await csvWriter.writeRecords(records);
        console.log("Report generated successfully.");

        let report = await uploadCSVToCloudinary(
          reportPath,
          process.env.FOLDER_NAME
        );

        await createReport({
          user_id: medications[0].user_id, 
          report_date: nextReportDate,
          file_path: report.secure_url,
        });

        await mailSender(
          user.email,
          "Medication - Weekly Report",
          weeklyReportEmail(
            `${user.first_name + " " + user.last_name}`,
            new Date(lastReportDate).toISOString().split("T")[0],
            nextReportDate.toISOString().split("T")[0],
            report.secure_url
          ),
          { filename: report.original_filename, path: report.secure_url }
        );

        // after the successfull upload on cloudinary or send mail, delete the file from local system
        fs.unlinkSync(reportPath);
      } else {
        console.log("No medications found for the current week.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
    }
  },
  {
    connection: reportQueue.client,
  }
);

const reminderWorker = new Worker(
  "sendReminder",
  async (job) => {
    const medication = job.data;
    try {
      const user = await getUserById(medication.user_id);
      const medicationLog = await createMedicationLog(medication.id);
      medication.log_id = medicationLog.id;
      await mailSender(
        user.email,
        "Medicine Reminder",
        medicineReminderEmail(
          `${user.first_name + " " + user.last_name}`,
          medication.name,
          new Date().toISOString().split("T")[0],
          medication.time,
          medication.log_id
        )
      );
      console.log(`Email sent to ${user.email}`);
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
    }
  },
  {
    connection: taskQueue.client,
  }
);

module.exports = { reportWorker, reminderWorker };
