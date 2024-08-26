const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./doctor');

const License = sequelize.define('License', {
  license_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  doctor_id: {
    type: DataTypes.STRING,
    references: {
      model: Doctor,
      key: 'doctor_id',
    },
  },
}, {
  timestamps: true,
});

module.exports = License;
