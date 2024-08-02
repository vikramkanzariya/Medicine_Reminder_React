const { Op } = require("sequelize");
const db = require("../models/index");

const { medication, medication_log, report } = db;

const createMedication = async (medicationData) => {
  try {
    const medicationDetails = await medication.create(medicationData);

    return medicationDetails;
  } catch (error) {
    throw error;
  }
};

const getMedicationByUser = async (userId) => {
  try {
    const medications = await medication.findAll({
      where: { user_id: userId },
      include: [
        {
          model: medication_log,
        },
      ],
    });

    return medications;
  } catch (error) {
    throw error;
  }
};

const getMedication = async () => {
  try {
    const date = new Date();
    const nextTime = new Date(new Date().getTime() + (5 * 60 * 1000))
    const medications = await medication.findAll({
      where: {
        start_date: {
          [Op.lte]: date,
        },
        end_date: {
          [Op.gte]: date,
        },
        time: {
          [Op.between]: [`${date.getHours()}:${date.getMinutes()+1}:00`,`${nextTime.getHours()}:${nextTime.getMinutes()}:00`],
        },
      },
    });
    return medications;
  } catch (error) {
    throw error;
  }
};

const createMedicationLog = async (medicationId) => {
  try {
    const medicationLog = await medication_log.create({
      medication_id: medicationId,
    });

    return medicationLog;
  } catch (error) {
    throw error;
  }
};

const getMedicationLogById = async (id) => {
  try {
    const medicationLog = await medication_log.findOne({
      where: { id: id, status: "pending" },
    });

    return medicationLog;
  } catch (error) {
    throw error;
  }
};

const getMedicationById = async (mid) => {
  try {
    const medications = await medication.findOne({
      where: { id: mid },
      include: [
        {
          model: medication_log,
        },
      ],
    });

    return medications;
  } catch (error) {
    throw error;
  }
};

const updateMedication = async (id, data) => {
  try {
    const updated = await medication.update(data, {
      where: { id: id },
    });

    return updated;
  } catch (error) {
    throw error;
  }
};

const getReportByUser = async (userId) => {
  try {
    const reportDetails = await report.findOne({
      where: { user_id: userId },
      order: [["report_date", "DESC"]],
    });

    return reportDetails;
  } catch (error) {
    throw error;
  }
};

const getReportsByUserId = async (userId) => {
  try {
    const reportDetails = await report.findAll({
      where: { user_id: userId },
      order: [["report_date", "DESC"]],
    });

    return reportDetails;
  } catch (error) {
    throw error;
  }
};

const getSingleMedication = async (userId) => {
  try {
    const singleMedication = await medication.findOne({
      where: { user_id: userId },
      order: [["createdAt", "ASC"]],
    });

    return singleMedication;
  } catch (error) {
    throw error;
  }
};

const getWeeklyMedications = async (userId, lastReportDate, nextReportDate) => {
  try {
    const medications = await medication.findAll({
      where: {
        user_id: userId,
        [Op.or]: [
          {
            start_date: {
              [Op.between]: [lastReportDate, nextReportDate],
            },
          },
          {
            end_date: {
              [Op.between]: [lastReportDate, nextReportDate],
            },
          },
        ],
      },
      raw: true,
      include: [
        {
          model: medication_log,
        },
      ],
    });

    return medications;
  } catch (error) {
    throw error;
  }
};

const deleteMedicationById = async (medicationId) => {
  try {
    const isDeleted = await medication.destroy({
      where: { id: medicationId },
    });

    return isDeleted;
  } catch (error) {
    throw error;
  }
};

const createReport = async (details) => {
  try {
    const reportDetail = await report.create(details);

    return reportDetail;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMedicationById,
  createMedication,
  getMedicationByUser,
  getMedication,
  createMedicationLog,
  getMedicationLogById,
  updateMedication,
  getReportByUser,
  getSingleMedication,
  getWeeklyMedications,
  createReport,
  getReportsByUserId,
  deleteMedicationById,
};
