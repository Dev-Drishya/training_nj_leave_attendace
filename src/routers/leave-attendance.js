const express = require('express')
const Attendance = require('../models/attendance')
const Holiday = require('../models/holiday')
const router = new express.Router()

// EndPoint1: Return Absent days as per screen 1 in JSON format
// For timebeing outpust is without authentication, so more than one outputs
router.get('/absentDays/', async (req, res) => {
    try {
        const users = await Attendance.find({})
        const abs = []
        users.forEach((user) => {
            abs.push(['User Name : ' + user.name + ', Absent Days : ' + user.ab.count])
        })
        return res.send(abs)
    } catch(e) {
        return res.send(500).send()
    }

    // Rough Work
    // Attendance.find({}).then((users) => {
    //     users.forEach((user) => {
    //         res.send('User Name : ' + user.name + ', Absent Days : ' + user.ab.count + '\n')
    //     })
        // res.send(users)
    // }).catch((e) => {
    //     res.send(500).send()
    // })
})

// EndPoint2: Return Absent days details as per screen 2.
router.get('/absentDetails/', async (req, res) => {
    try {
        const users = await Attendance.find({})
        const abs = []
        users.forEach((user) => {
            const temp = []
            temp.push(`User Name : ` + user.name + `, Absent Days Details: `)

            user.ab.absents.forEach((absen) => {
                temp.push(absen.absent.getDate() + '/' + (absen.absent.getMonth() + 1) + '/' + absen.absent.getFullYear())
            })

            abs.push(temp)

        })
        return res.send(abs)
    } catch(e) {
        return res.send(500).send()
    }
})

// EndPoint3: Return Available Leaves as per screen 3
router.get('/leaveBalance/', async (req, res) => {
    try {
        const users = await Attendance.find({})
        const abs = []
        users.forEach((user) => {
            const temp = []
            temp.push('Username : ' + user.name)
            temp.push('Contingency Leave: ' + user.cl.balance + ' Remaining, Valid Till ' + user.cl.validity.getDate() + '/' + (user.cl.validity.getMonth() + 1) + '/' + user.cl.validity.getFullYear())
            temp.push('Optional Holiday:  ' + user.oh.balance + ' Remaining, Valid Till ' + user.oh.validity.getDate() + '/' + (user.oh.validity.getMonth() + 1) + '/' + user.oh.validity.getFullYear())
            temp.push('Special Privilege Holiday:  ' + user.spl.balance + ' Remaining, Valid Till ' + user.spl.validity.getDate() + '/' + (user.spl.validity.getMonth() + 1) + '/' + user.spl.validity.getFullYear())

            abs.push(temp)
        })
        return res.send(abs)
    } catch(e) {
        return res.send(500).send()
    }
})

// EndPoint4: Return Holiday Calendar as per screen 4
router.get('/holidayCalender/', async (req, res) => {

    try {
        const holidays = await Holiday.find({})
        const abs = []
        holidays.forEach((holiday) => {
            abs.push('' + (holiday.thedate.getMonth() + 1) + ' ' + holiday.thedate.getDate() + ' / ' + holiday.day + ' - ' + holiday.description)
        })
        return res.send(abs)
    } catch(e) {
        return res.send(500).send()
    }
})


// Endpoint0: Create User and initiate attendance details
// For better understanding create only one user initially
router.post('/attendance', async (req, res) => {
    const user = new Attendance(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Endpoint5: Creating dummy holidays
router.post('/holidays', async (req,res) => {
    const holiday = await Holiday(req.body)

    try {
        await holiday.save()
        res.status(201).send(holiday)
    } catch (e) {
        res.status(400).send(e)
    }
})

// id : 60c25852f101fa1e1c51620f
// Endpoint6: Create an absent date using an id like above 
router.patch('/absentday/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const user = await Attendance.findById(_id)

        if(!user){
            return res.status(404).send()
        }

        // Increment in absent days
        user.ab.count = user.ab.count + 1
        // Adding absent date in absents array
        const absentDate = req.body.absentdate
        user.ab.absents = user.ab.absents.concat({ absent: absentDate })

        await user.save()
        res.send({
            absent_count : user.ab.count,
            absent_date: absentDate
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router

// Endpoints for users in case authentication and users data are required || Make it in another file in user.js in routers folder
// 1. Creating User Data || Sign Up
// 2. User login
// 3. User logout
// 4. User logoutfrom all devices
// 5. Getting User Data || Profile visit
// 6. Update User