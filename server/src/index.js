import { connectdb } from "./db/index.js";
import express from "express"
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
}) 

const app = express();

const port = process.env.PORT || 8080 

connectdb()
.then(() => {
    app.listen(port , () =>{
        console.log(`server is listening on port : ${port}`)
    })
})
.catch((error) => {
    console.log("mongodb connection failed !!! " , error)
    process.exit(1)
})