require('dotenv').config()
const User = require('../model/user')
const jwt = require('jsonwebtoken');

const { TOKEN_KEY } = process.env

const register = async (req,res)=>{
  console.log(req.params.id);
  try{
    if(req.params.id){
      
      let {name, lastname, phone, email, link} = req.body
      if(!(name && lastname && phone && email )){
            res.status(400).json("Information input is Require")
      }else{
        const user = await User.create({
          name,
          lastname, 
          phone,
          email,
          link,
          count:1
        })
        const token = jwt.sign({token: user},TOKEN_KEY,{expiresIn: "7h",});
        res.json({ message: "Registered in successfully  😊 👌", response:token });
      }
       //check the patrams and update
      const firstLogin = await User.findOne({link: req.params.id})
      console.log(firstLogin)
      let updateCount = {$set: {count: firstLogin.count+1} };
      await User.updateOne({_id:firstLogin._id}, updateCount)
    // get details from client
    }  
   
  }catch(err){ 
    console.log(err)
  }
}

// login user  
const login = async (req,res)=>{
    try{
      const { email } = req.body
      console.log(email)
      const user = await User.findOne({email});
      if(user){
        const token = jwt.sign({token: user},TOKEN_KEY,{expiresIn: "7h",});
        res.json({ message: "Login successfully  😊 👌", response:token });
        // res.status(200).json({message:"login sucessfully", resp:user.link})
      }else{  
        res.status(400).json({message:"inavlid phone number"})
      }
    }catch(err){
      console.log(err)
    }
}

//for user info
const winInfoList = async (req, res)=>{
  console.log(req.params.link)
  try{
    const info = await User.find().sort([['count', 'descending']]).limit(10)
    res.json(info)
    // if(info){
    //   res.json({resp:info})
    // }else{
    //   res.json({message:"invalid link"});
    // }
  }catch(err){
    console.log(err)
  }
}

module.exports = {register, login, winInfoList};