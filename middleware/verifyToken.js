
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const verifyToken = (req,res,next) => {

   const authHeader = req.headers.authorization || req.headers.Authorization

   if(!authHeader?.startsWith('Bearer')) return res.status(403).send({message:"User isn't authorized"})

   const token = authHeader.split(' ')[1]
   jwt.verify(token,process.env.ACCESS_TOKEN,async(err,decode)=>{
    if (err) {
      console.log(err)
      return res.status(403).send({message:err})
    }
      const decodeUser = decode
       req.user = decodeUser

    const currentUser = await User.findOne({email:req.user.email})
    if(currentUser.token === token){
      next()
    } else{
      res.status(403).send({message:"User isn't authorized"})
    }
   })
}

module.exports= verifyToken