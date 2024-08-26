const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./doctor');
const Specialty = require('./specialty');

const DoctorSpecialty = sequelize.define('DoctorSpecialty', {
  doctor_id: {
    type: DataTypes.STRING,
    references: {
      model: Doctor,
      key: 'doctor_id',
    },
  },
  specialty_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Specialty,
      key: 'specialty_id',
    },
  },
}, {
  timestamps: false,
  primaryKey: ['doctor_id', 'specialty_id'],
});

// Associations
Doctor.belongsToMany(Specialty, { through: DoctorSpecialty, foreignKey: 'doctor_id' });
Specialty.belongsToMany(Doctor, { through: DoctorSpecialty, foreignKey: 'specialty_id' });

module.exports = DoctorSpecialty;
