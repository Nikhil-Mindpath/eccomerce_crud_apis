import mongoose from "mongoose";
import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import { APiError } from "../utils/ApiError.js"


export const placeOrder = async (req, res, next) => {

   const { orderproduct, orderquantity, price, userId } = req.body

   if ([orderproduct, orderquantity, price, userId].some((field) => field === ""))
      throw new APiError(400, "All fields are required");

   let user;
   try {
      user = await User.findById(userId);
   } catch (error) {
      throw new APiError(400, error);
   }
   if (!user) throw new APiError(400, "NO user found ")
   console.log(user);
   let order = new Order({
      orderproduct,
      orderquantity,
      price,
      userId,
   });
   if (!order) throw new APiError(400, "Unable to create order")
   try {
      let session = await mongoose.startSession();
      session.startTransaction();
      await order.save({ session });
      // if (!user.userorders)user.userorders =[];
      user.userorders.push(order._id);
      await user.save({ session })
      await session.commitTransaction();

   } catch (error) {
      console.log("Error in adding orders ");
      throw new APiError(500, error);
   }

   return res.status(200).json({ order, user });

}

export const cancelById = async (req, res, next) => {
   let orderId = req.params.id
   if (!orderId) throw new APiError(400, "Id not found");

   let order;
   try {
      order = await Order.findByIdAndDelete(orderId).populate("userId");
      await order.userId.userorders.pull(order);
      order = await order.userId.save();
   } catch (error) {
      throw new APiError(500, "Unable to find order")
   }
   if (!order) throw new APiError(400, "No order with this id");

   return res.status(200).json({ order })

}

export const allOrderByUserId = async (req, res, next) => {
   let userId = req.params.id;
   if (!userId) return new APiError(400, "Enter user id ");

   let user;
   try {
      user = await User.findById(userId).populate("userorders");
   } catch (error) {
      throw new APiError(500, error);
   }
   if (!user) return new APiError(404, "Unable to find user  ");

   const orders = user.userorders;
   //  const orders  =  user.userorders

   //  if(!orders) res.status(200).json("No order found ");

   //  let fullOrder  = orders.map(async (orderId)=>{
   //     console.log(orderId);
   //    let order ;
   //     try {
   //   order =   await Order.findById(orderId);
   //    }
   //     catch (error) {
   //     throw new APiError(500,`Unable to find order ${orderId ,error}`);
   //    }
   //    console.log(order);
   //    return order ; 
   //  }) 

   return res.status(200).json(orders)

}    