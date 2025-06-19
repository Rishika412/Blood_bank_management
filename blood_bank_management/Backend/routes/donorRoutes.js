const express = require('express');
const { registerDonor, getDonors, getDonorById, deleteDonor } = require('../controllers/donorController');

const router = express.Router();

router.post('/register', registerDonor); 
router.get('/all', getDonors); 
router.get('/:id', getDonorById); 
router.delete('/:id', deleteDonor); 

module.exports = router;
