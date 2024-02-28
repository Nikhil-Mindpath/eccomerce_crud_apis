import express from "express"
import { allOrderByUserId, cancelById, placeOrder } from "../controllers/order.controller.js"

const orderRouter = express.Router()

orderRouter.post("/add",placeOrder);
orderRouter.delete("/delete/:id",cancelById)
orderRouter.get("/allorders/:id",allOrderByUserId)

export default orderRouter ;