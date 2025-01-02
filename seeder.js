const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: 'config/config.env' })

const TaskItem = require('./models/TaskItem');

mongoose.connect(process.env.MONGO_DB_CONNECTION_STING);

const taskItems = JSON.parse(fs.readFileSync(`${__dirname}/_data/TaskItem.json`, `utf-8`));

const importData = async () => {
    try {
        await TaskItem.create(taskItems);
        console.log(`Data Imported...`.green.inverse);
        process.exit();
    } catch (error) {
        console.error(err);
    }
};

const deletedData = async () => {
    try {
        await TaskItem.deleteMany();
        console.log(`Data Deleted...`.red.inverse);
        process.exit();
    } catch (error) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deletedData();
};