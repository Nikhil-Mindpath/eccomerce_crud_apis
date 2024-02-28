import express from "express";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/order.routes.js";

const app =  express();

app.use(express.json());



app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended :true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/user",userRouter)
app.use("/order",orderRouter)

export {app};