const Doctor = require('../models/doctor');
const License = require('../models/license');
const Specialty = require('../models/specialty');
const DoctorSpecialty = require('../models/doctorSpecialty');
const { validateDoctor } = require('../utils/validation');

// Add Doctor
const addDoctors = async (req, res, next) => {
    const transaction = await Doctor.sequelize.transaction();
    try {
      const doctors = req.body;
  
      if (!Array.isArray(doctors)) {
        return res.status(400).json({ message: '"value" must be of type array' });
      }

      for (const doctorData of doctors) {
        const { doctor_id, name, contact, license_id, specialty } = doctorData;
  
        const { error } = validateDoctor(doctorData);
        if (error) return res.status(400).json({ message: error.details[0].message });
  
        // Create Doctor and ensure `specialty` is stored
        const doctor = await Doctor.create({ doctor_id, name, contact, license_id, specialty }, { transaction });
  
        // Insert into Licenses table
        await License.create({ license_id, doctor_id }, { transaction });
  
        // Insert into Specialties table and DoctorSpecialties link table if `specialty` is provided
        if (specialty) {
          // Check if the specialty exists, if not, create it
          let specialtyRecord = await Specialty.findOne({ where: { specialty_name: specialty } });
          if (!specialtyRecord) {
            specialtyRecord = await Specialty.create({ specialty_name: specialty }, { transaction });
          }
  
          // Link the doctor with the specialty in the DoctorSpecialty table
          await DoctorSpecialty.create({ doctor_id, specialty_id: specialtyRecord.specialty_id }, { transaction });
        }
      }
  
      await transaction.commit();
      return res.status(201).json({ message: 'Doctors added successfully' });
    } catch (error) {
        console.log('Error caught in addDoctors:', error); // Debugging line
        next(error);
    }
  };
  

// Get Doctor by ID
const getDoctorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id, {
      include: [
        { model: License },
        { model: Specialty, through: { attributes: [] } },
      ],
    });

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    return res.status(200).json(doctor);
  } catch (error) {
    next(error);
  }
};

// Update Doctor
const updateDoctor = async (req, res, next) => {
  const transaction = await Doctor.sequelize.transaction();
  try {
    const { id } = req.params;
    const { name, contact, license_id, specialties } = req.body;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // Update Doctor
    await doctor.update({ name, contact }, { transaction });

    // Update License
    const license = await License.findOne({ where: { doctor_id: id } });
    await license.update({ license_id }, { transaction });

    // Update Specialties
    if (specialties && specialties.length > 0) {
      await DoctorSpecialty.destroy({ where: { doctor_id: id }, transaction });

      const specialtyRecords = await Specialty.findAll({
        where: { specialty_name: specialties },
      });

      const specialtyIds = specialtyRecords.map((s) => s.specialty_id);
      for (const specialty_id of specialtyIds) {
        await DoctorSpecialty.create({ doctor_id: id, specialty_id }, { transaction });
      }
    }

    await transaction.commit();
    return res.status(200).json(doctor);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Delete Doctor
const deleteDoctor = async (req, res, next) => {
  const transaction = await Doctor.sequelize.transaction();
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // Delete Doctor and associated records
    await License.destroy({ where: { doctor_id: id }, transaction });
    await DoctorSpecialty.destroy({ where: { doctor_id: id }, transaction });
    await doctor.destroy({ transaction });

    await transaction.commit();
    return res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports = { addDoctors, getDoctorById, updateDoctor, deleteDoctor };
