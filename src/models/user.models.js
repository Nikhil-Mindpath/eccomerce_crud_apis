import express from "express"
import mongoose from "mongoose"

const userSchema = new  mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    index : true ,
    trim : true,
  },
//   lastname : {
//     type : String,
//     required : true,
//     unique : true,
//     lowercase : true,
//     index : true ,
//     trim : true,
//   },
  email :{
    type :String,
    required : true,
    unique : true,
    lowercase : true,
  },
   password :{
    type : String,
     required : true, 
   },
   userorders : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Order",
    required : true 
   }],
},{timestamps : true})

export const User  =  mongoose.model("User",userSchema);
