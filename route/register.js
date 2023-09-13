const express = require('express')

const router = express.Router()
const handleNewUser = require('../controllers/registerControllers.js')
const verifySchema = require('../middleware/verifySchema.js')
const registerSchema = require('../schemas/userSchema.js')

router.post('/',verifySchema(registerSchema),handleNewUser)

module.exports = router
