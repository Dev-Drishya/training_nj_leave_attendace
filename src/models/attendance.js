const mongoose = require('mongoose')
const validator = require('validator')

const attendanceSchema = new mongoose.Schema({
    // User details
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid') 
            }
        }
    },

    // Absent Details
    ab: {
        count: {
            type: Number,
            default: 0,
            validate(value){
                if (value < 0) {
                    throw new Error('Absent number must be a non-negative number')
                }
            }
        },
        absents: [{
            absent: {
                type: Date,
                required: true
            }
        }]
    },
    // Contingency Leave
    cl: {
        balance: {
            type: Number,
            default: 6,
            validate(value){
                if (value < 0) {
                    throw new Error('Balance must be a non-negative number')
                }
            }
        },
        validity: {
            type: Date,
            default: '2021-08-03'
        }
    },
    // Optional Holidays
    oh: {
        balance: {
            type: Number,
            default: 3,
            validate(value){
                if (value < 0) {
                    throw new Error('Balance must be a non-negative number')
                }
            }
        },
        validity: {
            type: Date,
            default: '2021-08-03'
        }
    },
    // Special Privilege Leave
    spl: {
        balance: {
            type: Number,
            default: 10,
            validate(value){
                if (value < 0) {
                    throw new Error('Balance must be a non-negative number')
                }
            }
        },
        validity: {
            type: Date,
            default: '2021-08-03'
        }
    },
}, {
    timestamps: true
})

const attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = attendance