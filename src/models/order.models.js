import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   orderproduct  : {
    type :  String,
    required : true,  
   },
   orderquantity:{
         type : Number,
         required : true,

   },
   price :{
       type : Number,
       default : 0,
       required : true,
   },
   userId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true ,
   },

},{timestamps : true})

export const Order  =  mongoose.model("Order",orderSchema);