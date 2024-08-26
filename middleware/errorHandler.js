// const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!' });
//   };
  
//   module.exports = errorHandler;
  

// middleware/errorHandler.js
// errorHandler.js
// In your errorHandler (middleware/errorHandler.js)

const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}\nStack: ${err.stack}`);
  res.status(500).json({ message: 'An unexpected error occurred.', error: err.message });
};

module.exports = errorHandler;
