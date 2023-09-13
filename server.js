require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const corsOption = require('./config/corsConfig/corsOptions')
const app = express()
const PORT = 3100
const connectDB = require('./config/dbConnector')
const credentials =  require('./middleware/credentials')
const verifyToken = require('./middleware/verifyToken')


const registerUser = require('./route/register.js')
const loginUser = require('./route/login')
const resetPassword = require('./route/resetPassword')
const forgotPassword = require('./route/forgotPassword')

app.use(cors(corsOption))

app.use(express.json())

connectDB()

app.use(credentials)


app.use('/register', registerUser)
app.use('/login', loginUser)
app.use('/', forgotPassword)

app.use(verifyToken)

app.use('/', resetPassword)


mongoose.connection.on('open',()=>{
    console.log('connected to Mongodb')
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    }) 
})
