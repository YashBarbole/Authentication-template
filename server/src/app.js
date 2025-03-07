
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",  
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials : true ,

}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routing

import userRouter from "./routes/auth.routes.js"

app.use("/api/auth" , userRouter)

export {app}