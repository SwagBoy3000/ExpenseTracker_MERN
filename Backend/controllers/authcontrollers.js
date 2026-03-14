import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn : "1h" });
}

export async function registerUser(req,res) {
    const { fullName, email, password, profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message : "Enter all credentials"})
    }
    try{
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "email already is use"})
        }
        
        const newUser = new User({fullName, email, password, profileImageUrl})
        await newUser.save();

        res.status(201).json({
            id: newUser._id,
            newUser,
            token: generateToken(newUser._id),
        })

    }catch (error) {
        res.status(500).json({message: "error registering user ", error : error.message})
    }

}


export async function loginUser(req,res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }


    try {
        
        const user = await User.findOne({email});
        if (!user || !await user.comparePassword(password)) {
            return res.status(400).json({message: "invalid credentials"})
        }

        res.status(200).json({
            id: user._id,
            user,
            token : generateToken(user._id)
        })

    } catch (error) {

        res.status(500).json({message: "error login user ", error : error.message})

        
    }
}

export async function getUserInfo(req,res) {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({message: "user not found"})
        }

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: "error finding user ", error : error.message})

    }
}