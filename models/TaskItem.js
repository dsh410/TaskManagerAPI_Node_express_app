const mongoose = require('mongoose');
const slugify = require('slugify');

const TaskItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add Task Item Title'],
        trim: true,
        maxlength: 50,
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        maxlength: 150,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    priority: {
        required: true,
        type: String,
        enum: [
            'Low',
            'Medium',
            'High'
        ],
        default: 'Low'
    },
    difficulty: {
        required: true,
        type: String,
        enum: [
            'Easy',
            'Medium',
            'Hard'
        ],
        default: 'Easy'
    },

    website: {
        type: String,
        match: [/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'please us valid url https']
    },

});

module.exports = mongoose.model('TaskItem', TaskItemSchema);