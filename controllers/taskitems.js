const connectDb = require('../config/db');
const TaskItem = require('../models/TaskItem');
const ErrorResponse = require('../utils/errorRespone');
const asyncHandler = require('../middleware/async');


exports.getAllTasks = asyncHandler(async (req, res, next) => {
    let queryString = req.query;
    const reqQuery = { ...req.query };
    const removeFields = ['select'];
    // removeFields.map(field => delete reqQuery(field));
    console.log(reqQuery);
    queryString = JSON.stringify(reqQuery);
    const Tasks = await TaskItem.find(JSON.parse(queryString));
    res.status(200).json({ count: Tasks.length, Data: Tasks });

});

exports.getTask = asyncHandler(async (req, res, next) => {

    const Task = await TaskItem.findById(req.params.id);
    if (!Task) {
        return next(new ErrorResponse(`Task Item not found with ID: ${req.params.id}`, 404));
    }
    res.status(200).json({ Data: Task });

});

exports.updateTask = asyncHandler(async (req, res, next) => {

    const Task = await TaskItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    if (!Task) {
        return next(new ErrorResponse(`Task Item not found with ID: ${req.params.id}`, 404));
    }
    return res.status(200).json(Task);
});

exports.createTask = asyncHandler(async (req, res, next) => {

    const newTask = await TaskItem.create(req.body);
    res.status(201).json({ data: newTask });

});

exports.deleteTask = asyncHandler(async (req, res, next) => {

    const deletedTask = await TaskItem.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
        return next(new ErrorResponse(`Task Item not found with ID: ${req.params.id}`, 404));
    }
    res.status(204).json({ Request: 'Successful', Data: {} });

});