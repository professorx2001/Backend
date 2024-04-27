import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//make a function and export it
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${ process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected!! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Failed: ", error);
        process.exit(1)
    }
}

export default connectDB