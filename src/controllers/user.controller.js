import { json } from "express";
import { User } from "../models/user.models.js";
import { APiError } from "../utils/ApiError.js";
import * as bcrypt from "bcrypt"


export const registerUser = async (req,res,next) =>{
    const {username ,email,password } = req.body
     if([username,email,password].some((field)=> field?.trim() === ""))
     throw new APiError(400 ,"All fields are required !! ");
    let existingUser ;
    try{
        existingUser = await User.findOne({email});
    } 
    catch (error) {
        console.log("Error in searching user ",error);
        throw new APiError(400,"error in searching user !! ")
    }
    if(existingUser) throw new APiError(400,"User already exist !! ")
   
    const hashedPassword =   bcrypt.hashSync(password,10);

    const savedUser = new User({
        username ,
        email ,
        password : hashedPassword,
        userorders : [],
    });
    if(!savedUser) throw new APiError(400,"Unable to create user ");
    console.log("saveduser ",savedUser); 
     let  user ;
    try {
        user =  await savedUser.save();
    } catch (error) {
      throw new APiError(401,"Unable to save user  in db!!",error)  
    }
   if(!user) throw new APiError(400, "Unable to save user")
   return res.status(200).json({user });

} 


export const loginUser = async (req,res,next)=>{
    // let id =  params.id
     const {email,password} = req.body
       let  user ;
     try {
          user = await User.findOne({email}).lean(true);
     } catch (error) {
        console.log("Error occured ",error);
        throw new APiError(400,"Unable to find user");
     }
     console.log("USer" , user);
     if(!user) throw new APiError(400,"User not found !!");
     console.log(password);
     const isPasswordCorrect  = bcrypt.compareSync(password,user.password);

     if(!isPasswordCorrect) throw new APiError(404,"Password is incorrect !");

     return res.status(200).json({user});

}

export const updateUser = async (req,res,next) =>{
    let userId =  req.params.id;
    const {username ,email,password} = req.body;
    if(!userId) throw new APiError(400,"Invalid id")
    console.log("userid ",userId);
    const hashedPassword =  bcrypt.hashSync(password,10);
    let user ;
    try { 
        user =  await User.findByIdAndUpdate(userId ,{
        username,
        email,
        password ,
        });
     } catch (error) { 
        console.log(error);
        throw new APiError(400,"Unable to find user ") 
     }
     if(!user) throw new APiError(400,"No user found with this id");

      return res.status(200).json({user});
}   

export const deleteById =async(req,res,next)=>{
    let userId =  req.params.id;

    let user ;
    try {
        user =await User.findOneAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw new APiError(400,"Unable to delte user");
    }
    if(!user) throw new APiError(400,"Wrong id ")

    return res.status(200).json({message : "User deleted succesfully"});
}