const express = require('express');
const router = express.Router();
const { 
    getAllTasks, 
    getTask, 
    updateTask, 
    createTask, 
    deleteTask 
} = require('../controllers/taskitems')

router.route('/')
.get(getAllTasks)
.post(createTask)

router.route('/:id')
.get(getTask)
.put(updateTask)
.delete(deleteTask)

module.exports=router;