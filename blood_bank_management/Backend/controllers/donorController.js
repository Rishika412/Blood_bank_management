const Donor = require('../models/donorModel');

// Register a new donor
exports.registerDonor = async (req, res) => {
  console.log("Request Body: ", req.body); // Log incoming request
  try {
      const donor = new Donor(req.body);
      await donor.save();
      res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
      console.error("Registration Error: ", error); // Log error details
      res.status(400).json({ message: 'Error registering donor', error: error.message || error });
  }
};


// Get all donors
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donors', error });
  }
};

// Get a single donor by ID
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donor', error });
  }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donor', error });
  }
};
