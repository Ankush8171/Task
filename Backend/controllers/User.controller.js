import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken";


const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET
  );
};

const registerUser = async (req,res)=>{
    const {user,password,email} = req.body;
    console.log(req.body);
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

        const saveduser = await newUser.save();
        const token = createToken(saveduser._id);

        res.json({
            success: true,
             token,
             user: saveduser
             
        });;

    }catch(err){
    console.log(err);

    res.json({
        success:false,
        message: err.message
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

        const token = createToken(user._id);
        res.json({success:true,token});
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


// Add User
const addUser = async (req, res) => {
  try {
   const { user, email,password } = req.body;

  const newUser = await userModel.create({
    user,
    email,
  });

  res.json({
    success: true,
    data: newUser,
  });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      updatedUser,
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
    deleteUser,
    updateUser,
    addUser
    
}