const express = require('express')
require('./db/mongoose')
const leave_attendanceRouter = require('./routers/leave-attendance')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(leave_attendanceRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})