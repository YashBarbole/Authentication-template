import { connectdb } from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path : "./.env"
}) 

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