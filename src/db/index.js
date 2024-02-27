import mongoose from "mongoose";
import { DB_NAME } from "../constatns.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Mongo db connected to the host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Mongo db connection error: `,error);
        process.exit(1);    
    }
}
export default connectDB;