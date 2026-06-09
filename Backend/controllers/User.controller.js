import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import validator from "validator"

const registerUser = async (req,res)=>{
    const {user,password,email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exits"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            user,
            email:email,
            password:hashedPassword
        })

        const saveduser =await newUser.save();
         
        res.json({success:true,saveduser});

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:'Error'
        })

    }

}


//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User Doesn't exits"
            })

        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }

    res.json({success:true});
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})

    }
}


//get user
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//deleet user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



export {
    registerUser,
    loginUser,
    getUsers,
    deleteUser
}