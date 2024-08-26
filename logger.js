// In your logger (logger.js)

const fs = require('fs');
const path = require('path');

// Define log file paths
const logFilePath = path.join(__dirname, 'app.log');
const errorLogFilePath = path.join(__dirname, 'error.log');

// Create write streams in append mode
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
const errorLogStream = fs.createWriteStream(errorLogFilePath, { flags: 'a' });

// Function to log messages
const log = (level, message, isError = false) => {
  const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
  const stream = isError ? errorLogStream : logStream;
  stream.write(logMessage);
};

// Export logging functions
module.exports = {
  info: (message) => log('info', message),
  error: (message) => log('error', message, true)
};
