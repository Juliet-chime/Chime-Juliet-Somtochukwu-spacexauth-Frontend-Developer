const User = require('../model/userModel')
const bcrypt = require("bcrypt");

const handleResetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = req.user

  const currentUser = await User.findOne({ email: user.email })

  if (!currentUser) res.status(401).send({ msg: "User not authorized" })

  const matchPassword = await bcrypt.compareSync(oldPassword, currentUser.password)
  if (!matchPassword) {
    res.status(400).send({ msg: "The oldpassword entered isn't correct" })
    return
  } else {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    currentUser.password = hashedPassword
    await currentUser.save()
    res.status(201).send({ msg: 'Password reset successfully' })
  }

}

module.exports = { handleResetPassword }