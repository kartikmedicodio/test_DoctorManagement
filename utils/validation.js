// const Joi = require('joi');

// const validateDoctor = (doctor) => {
//   const schema = Joi.object({
//     doctor_id: Joi.string().required(),
//     name: Joi.string().required(),
//     contact: Joi.string().optional(),
//     license_id: Joi.string().required(),
//     specialty: Joi.string().required()  // Make `specialty` required
//   });

//   return schema.validate(doctor);
// };

// module.exports = { validateDoctor };

const Joi = require('joi');

const validateDoctor = (doctor) => {
  const schema = Joi.object({
    doctor_id: Joi.string().required(),
    name: Joi.string().required(),
    contact: Joi.string().optional(),
    license_id: Joi.string().required(),
    specialty: Joi.string().optional()  // Add `specialty` as an optional field
  });

  return schema.validate(doctor);
};

module.exports = { validateDoctor };
