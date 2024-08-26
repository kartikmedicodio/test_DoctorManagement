const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  doctor_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
  },
  license_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  specialty: {  // Add the specialty column here
    type: DataTypes.STRING,
    allowNull: false,  // Ensure it's not null
  },
}, {
  timestamps: true,
});

module.exports = Doctor;
