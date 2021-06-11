const mongoose = require('mongoose')

const holidaySchema = new mongoose.Schema({
    // Holiday calendar details
    thedate: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})



const Holiday = mongoose.model('Holiday', holidaySchema)

module.exports = Holiday