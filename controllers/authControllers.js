
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const access_token = process.env.ACCESS_TOKEN

const handleLogin = async (req, res) => {
    const { email, password } = req.body

    let currentUser = await User.findOne({ email })

    if (!currentUser) return res.status(404).json({ message: "User not found" })

    //compare user password
    const matchPassword = await bcrypt.compare(password, currentUser.password)

    if (matchPassword) {
        const accessToken = jwt.sign({ name: currentUser.name, email: email }, access_token, { expiresIn: '1h' })
        currentUser.token = accessToken;

        const result = await currentUser.save()

        res.status(201).json({ message: `${currentUser.name} has successfully logged in`, result })
    } else {
        return res.status(400).json({ message: "Please check your credentials correctly" })
    }

}

module.exports = handleLogin