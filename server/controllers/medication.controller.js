const jwt = require('jsonwebtoken')
require('dotenv').config();
const {
  createMedication,
  getMedicationByUser,
  getMedicationLogById,
  getMedicationById,
  updateMedication,
  getReportsByUserId,
  deleteMedicationById,
} = require("../repositories/medication.repository");

exports.addMedication = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      startDate,
      endDate,
      time,
      frequency,
      dayOfWeek,
    } = req.body;

    if (!name || !type || !startDate || !time) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Validate type and corresponding fields
    if (
      type === "recurring" &&
      (!frequency || (frequency === "weekly" && !dayOfWeek))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data for recurring medication",
      });
    }

    const medicationData = {
      user_id: req.user.id, // Assumes the user is authenticated and available in req.user
      name,
      description,
      type,
      start_date: startDate,
      end_date:endDate, // endDate is required only for recurring
      time,
      frequency: type === "recurring" ? frequency : null, // frequency is required only for recurring
      day_of_week: frequency === "weekly" ? dayOfWeek : null, // dayOfWeek is required only for weekly frequency
    };

    const medication = await createMedication(medicationData);

    return res.status(201).json({
      success: true,
      medication,
      message: "Medication added successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMedicationOfUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const medications = await getMedicationByUser(userId);

    return res.json({
      success: true,
      medications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.markAsDone = async (req, res) => {
  try {
    const medicationLogId = jwt.decode(req.query.id,process.env.JWT_SECRET);

    const medicationLog = await getMedicationLogById(medicationLogId);

    if (!medicationLog) {
      return res.status(400).json({
        success: false,
        message: "invalid id or request",
      });
    }

    medicationLog.status = "done";
    medicationLog.taken_at = new Date();
    await medicationLog.save();

    return res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Medicine Reminder</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .message { font-size: 20px; color: green; }
        </style>
    </head>
    <body>
        <div class="message">Thank you! Your medication has been marked as done.</div>
    </body>
    </html>
  `);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.medicationById = async (req, res) => {
  try {
    const medicationId = req.params.id;

    const medicationDetails = await getMedicationById(medicationId);

    return res.json({
      success: true,
      medications: medicationDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      startDate,
      endDate,
      time,
      frequency,
      dayOfWeek,
    } = req.body;

    // Validate input data if needed
    if (
      !name ||
      !description ||
      !type ||
      !startDate ||
      (type === "recurring" && !endDate) ||
      (frequency === "weekly" && !dayOfWeek)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Find the medication by ID and update it
    const updatedMedication = await updateMedication(id, {
      name,
      description,
      type,
      start_date: startDate,
      end_date: endDate,
      time,
      frequency: type === "recurring" ? frequency : null,
      day_of_week:
        type === "recurring" && frequency === "weekly" ? dayOfWeek : null,
    });

    if(!updatedMedication[0]){
      return res.json({
        success:false,
        message:"medicine not found for update"
      })
    }

    return res.json({
      success:true,
      message:"data updated successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMedication = async(req,res)=>{
  try {
    const { id } = req.params;

    const deleted = await deleteMedicationById(id);

    if(!deleted[0]){
      return res.json({
        success:false,
        message:"medicine not found"
      })
    }

    return res.json({
      success:true,
      message:"medicine delete successfully"
    })
  } catch (error) {
    
  }
}

exports.getReports = async (req,res)=>{
  try {
    const userId = req.user.id;
    const reports = await getReportsByUserId(userId);

    return res.json({
      success:true,
      reports:reports
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}