import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectdb = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Database connected successfully at: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("database connection error : " , error)
        process.exit(1)
    }
}

export {connectdb}