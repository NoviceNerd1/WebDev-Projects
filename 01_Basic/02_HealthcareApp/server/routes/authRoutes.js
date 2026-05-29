const express = require("express");
const {
  register,
  login,
  getMe,
  createStaff,
} = require("../controllers/authController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/create-staff", protect, authorize("admin"), createStaff);

module.exports = router;
