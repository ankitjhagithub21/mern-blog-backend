const bcrypt = require('bcrypt');
const User = require("../models/user")



const { generateToken } = require('../utils/auth');


exports.login = async (req, res) => {
  
  const {username,password} = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password !' });
    }

    const token = generateToken(user);
    res.cookie('jwt',token,{
      httpOnly:true,
      secure:true,
      sameSite:"none",
      expires:new Date(Date.now()+86400000) // 24 hour
    })
    res.json({ 
      message:"Login Successfull.",
      
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  const { username,password } = req.body;
  
  try {
    
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUser = async(req,res) =>{
  try{
    const userId = req.id
    const user = await User.findById(userId).select("-password")
    if(!user){
      res.json({message:"User not found."})
    }
    res.json({user})
  }catch(error){
      console.log(error)
      res.json({message:"Internal server error !"})
  }
}

exports.logout = async(req,res) =>{
  try{
   res.clearCookie('jwt').json({
    message:"Logout Successfull."
   })
  }catch(error){
      console.log(error)
      res.json({message:"Internal server error !"})
  }
}

