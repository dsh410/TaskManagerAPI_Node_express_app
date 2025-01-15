const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const TaskItems = require('./routes/taskitems');
const connectDb = require('./config/db')
const errorHandler = require('./middleware/errorhandler');
const cors = require('cors');




dotenv.config({ path: './config/config.env' });

connectDb();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};
app.use(cors()); 
app.use(express.json());

app.use('/api/v1/taskItems/', TaskItems);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`.yellow.bold)
})

process.on('unhandledRejection', (error, promise) => {
console.log(`Error: ${error.message}`.red);
server.close(() => process.exit(1));
});