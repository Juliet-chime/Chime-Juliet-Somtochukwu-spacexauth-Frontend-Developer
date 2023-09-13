const express = require('express')

const router = express.Router()
const resertPassword = require('../controllers/resetPasswordControllers')

const {handleResetPassword} = resertPassword


router.post('/resetPassword',handleResetPassword)



module.exports = router