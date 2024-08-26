const express = require('express');
const { addDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

const router = express.Router();

// Route to handle batch addition of doctors
router.post('/doctors', addDoctors);

router.get('/doctors/:id', getDoctorById);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);


router.post('/test-error', (req, res) => {
    throw new Error('Test error');
  });
  
module.exports = router;
