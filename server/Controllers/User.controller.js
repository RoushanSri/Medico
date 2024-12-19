import { AsyncHandler } from "../utils/AsyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import {User} from '../models/User.js'

const generateTokens= async (userId)=>{
    try {
        const user = await User.findOne(userId)
        const accessToken = await user.generateAccessToken()
        return {accessToken};
    } catch (error) {
        throw new apiError(401, 
            "Failed to generate access token",
            error
        )
    }
}

const handleRegister = AsyncHandler(async (req, res) => {
    const { firstName, lastName, password, email, confirmPassword, license} = req.body;
    
    
    if(!firstName || !password || !email || !confirmPassword) {        
        throw new apiError(401, "All fields are required")
    }

    if(password!==confirmPassword){
        throw new apiError(401, "Passwords do not match")
    }

    const existingUser = await User.findOne({email});

    if(existingUser)
        throw new apiError(401, "Email already exists")

    const user = await User.create({
        firstName,
        lastName,
        password,
        email,
        role: license? 'doctor' : 'patient'
    })

    const newUser = await User.findById(user._id).select("-password")

    if(!newUser){
        throw new apiError(500, "Failed to create user")
    }

    res.status(201).json(
        new apiResponse(200, newUser, "User created successfully")
    )
})

const handleLogin = AsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email ||!password) {
        throw new apiError(401, "All fields are required")
    }
    const user = await User.findOne({email})
    if(!user)
        throw new apiError(401, "Invalid credentials")

    const isValid = await user.comparePassword(password)
    if(!isValid)
        throw new apiError(401, "Invalid credentials")

    const {accessToken}=await generateTokens(user._id)

    const loggedinUser = await User.findById(user._id).select("-password")

    const options ={
        secure: true,
        httpOnly: true
    }

    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new apiResponse(200, loggedinUser, "Logged in successfully")
    )

})

const handleLogout = AsyncHandler(async (req, res)=>{
    const options ={
        secure: true,
        httpOnly: true
    }

    res.clearCookie("accessToken", options)
    .json(
        new apiResponse(200, null, "Logged out successfully")
    )
})

export {handleRegister, handleLogin, handleLogout};