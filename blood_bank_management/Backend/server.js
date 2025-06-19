require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const donorRoutes = require('./routes/donorRoutes');
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/donors', donorRoutes);
app.use("/api/auth", authRoutes);



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


// Hospital Schema
const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    blood_group: { type: String },
    unit: { type: String },
    contactPerson: { type: String, required: true },
  }, { timestamps: true });
  
  const Hospital = mongoose.model('Hospital', hospitalSchema);
  
  // Routes
  
  // POST: Register a new hospital
  app.post('/api/hospitals', async (req, res) => {
    try {
      const hospital = new Hospital(req.body);
      await hospital.save();
      res.status(201).json({ message: 'Hospital registered successfully', hospital });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET: Fetch all hospitals
  app.get('/api/hospitals', async (req, res) => {
    try {
      const hospitals = await Hospital.find();
      res.status(200).json(hospitals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
