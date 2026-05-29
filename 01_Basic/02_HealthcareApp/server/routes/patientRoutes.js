const express = require("express");
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin", "doctor", "nurse"), createPatient);
router.get("/", authorize("admin", "doctor", "nurse"), getAllPatients);
router.get(
  "/:id",
  authorize("admin", "doctor", "nurse", "patient"),
  getPatientById,
);
router.put("/:id", authorize("admin", "doctor", "nurse"), updatePatient);
router.delete("/:id", authorize("admin"), deletePatient);

module.exports = router;
