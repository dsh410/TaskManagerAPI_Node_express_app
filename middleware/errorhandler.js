const ErrorResponse = require('../utils/errorRespone');

const errorHandler = ((err, req, res, next) => {

    let error = {...err}
    error.message = err.message;
    // console.log(err.stack.red);

    if(err.name === 'CastError'){
        const message = `Task Item not found with ID: ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    if(err.errors.title.path === 'title'){
        const message = err.errors.title.message;
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({Request:'Failed', Error: error.message || 'Server Error'})
})

module.exports = errorHandler;