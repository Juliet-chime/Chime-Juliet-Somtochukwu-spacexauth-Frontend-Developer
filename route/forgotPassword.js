const express = require('express')

const router = express.Router()
const password = require('../controllers/forgotpasswordControllers')

const { handleForgotPasswordLink, handleForgotPassword, handleVerifyForgotPasswordLink } = password

router.post('/send/forgotpassword/link', handleForgotPasswordLink)
router.post('/verify/forgotpassword', handleVerifyForgotPasswordLink)
router.post('/forgotpassword', handleForgotPassword)



module.exports = router