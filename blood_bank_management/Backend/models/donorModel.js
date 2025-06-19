const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  phone: { type: String, required: true, match: [/^[0-9]{10,15}$/, "Invalid phone number"] },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  ageConfirmation: { type: Boolean, required: true },
  medicalQuestions: {
    recentIllness: { type: Boolean, default: false },
    heartCondition: { type: Boolean, default: false },
    bloodPressure: { type: Boolean, default: false },
    diabetes: { type: Boolean, default: false },
    hepatitis: { type: Boolean, default: false },
    hiv: { type: Boolean, default: false },
    medication: { type: Boolean, default: false },
    surgery: { type: Boolean, default: false },
    pregnancy: { type: Boolean, default: false },
    vaccination: { type: Boolean, default: false }
  }
}, { timestamps: true });


module.exports = mongoose.model('Donor', donorSchema);
