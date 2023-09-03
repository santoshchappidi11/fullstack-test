
// import Tokenmodel from "../Models/Tokenmodel.js";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt"
// import { v4 as uuidv4 } from 'uuid';


export const register = async(req, res) => {
    try {
            const {name, email, password, number, role, pin} = req.body;

            if(!name || !email || !password || !number || !role || !pin) return res.status(404).json({success:false, message:"All fields are required!"})

            const isAlreadyEmail = await UserModel.find({email:email})

            if(isAlreadyEmail?.length) return res.status({success:false, message:"this email already exists please try another one!"})

            const hashedPassword = await bcrypt.hash(password,10)
            const hashedPin = await bcrypt.hash(pin,10)

            const newUser = new UserModel({
                name,
                email,
                password:hashedPassword,
                number,
                role,
                pin:hashedPin,
            })

            await newUser.save()

            return res.status(200).json({success:true, message:"Registration successfull!"})

    } catch (error) {
        return res.status(500).json({success:false, error:error.message})
    }
}



export const login = async(req, res) => {
    try {
            const {email, password} = req.body;

            if(!email || !password) return res.status(404).json({success:false, message:"All fields are required!"})

          const user = await UserModel.findOne({email:email})

          // console.log(user)

          if(!user){
           return res.status(404).json({success:false, message:"user not found!"})
          }

          const isPasswordRight = await bcrypt.compare(password, user.password)
          // console.log(isPasswordRight)

          // const randomString = uuidv4()
          //   const token = randomString;

          //   const newToken = new Tokenmodel({
          //       token:token,
          //       userId:user._id
          //   })

          //   await newToken.save()

            // console.log(newToken)

          if(isPasswordRight){

            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET)

            const userObj = {
                name:user.name,
                role:user.role,
                number:user.number,
                userId:user._id
            }
           return res.status(200).json({success:true, message:"login successfull!", user: userObj, token:token})
          }

        return  res.status(404).json({success:false, message:"Password is wrong"})

    } catch (error) {
        return res.status(500).json({success:false, error:error.message})
    }
}