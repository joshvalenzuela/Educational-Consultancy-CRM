const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/appointments", appointmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
