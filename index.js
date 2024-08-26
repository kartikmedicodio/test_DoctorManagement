// const express = require('express');
// const sequelize = require('./config/database');
// const doctorRoutes = require('./routes/doctorRoutes');
// const errorHandler = require('./middleware/errorHandler');

// const app = express();
// app.use(express.json());

// app.use('/api', doctorRoutes);

// app.use(errorHandler);

// sequelize.sync()
//   .then(() => {
//     console.log('Database connected and synchronized');
//     app.listen(3000, () => {
//       console.log('Server running on port 3000');
//     });
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

//   app.get('/test-error', (req, res) => {
//     throw new Error('Test error');
//   });
  

const logger = require('./logger');
const express = require('express');
const sequelize = require('./config/database');
const doctorRoutes = require('./routes/doctorRoutes');
const errorHandler = require('./middleware/errorHandler');
// const logger = require('../logger');


const app = express();
app.use(express.json());

logger.info('Application started'); 
app.use('/api', doctorRoutes);
app.use(errorHandler);
// Error handler middleware should be after all routes
app.use(errorHandler);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

