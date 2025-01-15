const mongoose = require('mongoose');

const connectDb = async () => {
    const mongooseDbConnection = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STING);

    console.log(`MongoDb Connected: ${mongooseDbConnection.connection.host}`);
};

module.exports = connectDb;