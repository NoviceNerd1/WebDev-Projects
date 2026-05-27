const { default: mongoose } = require("mongoose");
const Patient = require("../models/Patient");

const createPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, medicalHistory } = req.body;

    // Basic validation
    if (!name || !age || !gender || !contact) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      contact,
      medicalHistory,
    });

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient,
    });
  } catch (error) {
    console.error("Create Patient Error:", error);

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: errors[0],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({
      createdAt: -1,
    });

    if (!patients.length) {
      return res.status(200).json({
        success: true,
        message: "No patients found",
        count: 0,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate MongoDB Object Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient fetched successfully",
      data: patient,
    });
  } catch (error) {
    console.error("Get Patient Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid patient ID",
      });
    }

    const patient = await Patient.findByIdAndUpdate(
      id,

      req.body,

      {
        new: true,

        runValidators: true,
      },
    );

    if (!patient) {
      return res.status(404).json({
        success: false,

        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Patient updated successfully",

      data: patient,
    });
  } catch (error) {
    console.error("Error Updating Patient:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to update patient",
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // validate Object Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
      data: patient,
    });
  } catch (error) {
    console.log("Error deleting patient:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete patient",
    });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
