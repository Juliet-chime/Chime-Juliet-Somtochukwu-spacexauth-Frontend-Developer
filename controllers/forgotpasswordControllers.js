const User = require('../model/userModel')
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const emailConfig = require('../emailConfig/emailConfig.js')

const {sendEmail} = emailConfig

const forgotPassword_token =  process.env.FORGOT_PASSWORD
const clientURL = process.env.BASE_URL;

    const handleForgotPasswordLink = async (req, res) => {
       try{
        const {email} = req.body
        const currentUser = await User.findOne({email})

        if(!currentUser) res.status(404).json({msg:'No user found'})

        let forgotToken = crypto.randomBytes(32).toString("hex");

        const passwordToken = jwt.sign({forgotToken},forgotPassword_token,{expiresIn:'600000ms'})

        const link = `${clientURL}/forgotpassword?token=${passwordToken}`
        await sendEmail(email,`Please click on this Link below to proceed ${link}`,'Forgot password code')
       res.status(200).json({message: `An email has been sent to ${email} to reset your password`,passwordToken,link});
       }catch(e){
        console.log(e)
       }
    }

    const handleVerifyForgotPasswordLink = async (req, res) => {
        const {email, passwordToken} = req.body
        const currentUser = await User.findOne({email})

        if(!currentUser) res.status(404).send({msg:'User not found'})

        jwt.verify(passwordToken,forgotPassword_token,async(err,decode)=>{
            if(err) res.status(400).send({msg:'Error verifying otp',e:err})

            currentUser.forgotPassword = true
            await currentUser.save()
            res.status(200).send({tokenVerified:true})
        })
    }

    const handleForgotPassword = async (req, res) => {
        const {newPassword,email} = req.body

        const currentUser = await User.findOne({email})
        if(!currentUser) res.status(404).send({msg:'User not found'})
        if(currentUser.forgotPassword){
            const hashedPassword = await bcrypt.hash(newPassword,10)
            currentUser.password = hashedPassword
            currentUser.forgotPassword = undefined
            await currentUser.save()
           res.status(202).send({reset:true})
        } else{
            res.status(400).send({msg:"User 'can't' reset password"})
        }
    }

    module.exports = {handleForgotPasswordLink,handleVerifyForgotPasswordLink,handleForgotPassword}