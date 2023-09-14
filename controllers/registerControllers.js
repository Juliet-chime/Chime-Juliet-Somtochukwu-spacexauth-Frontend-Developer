
const bcrypt = require('bcrypt')
const User = require('../model/userModel')

const handleNewUser = async (req, res) => {
    const { name, email, password } = req.body

    const duplicateUser = await User.findOne({ email })

    if (duplicateUser) return res.status(404).json({ message: 'User already exist' })

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            "name": name,
            "email": email,
            "password": hashedPassword,
        }

        const result = await User.create(user)
        res.status(201).json({ message: 'User created successfully', result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

module.exports = handleNewUser