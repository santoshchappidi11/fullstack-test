import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import { login, register } from "./Controllers/UserController.js"
import { addProduct, deleteProduct, getProducts } from "./Controllers/ProductController.js"
import morgan from "morgan"

const app = express()
app.use(express.json())
dotenv.config()
app.use(morgan("dev"))
app.use(cors())

// const awdizToken = (req, res) => {
//     try {    
//     const randomString = uuidv4()
//      const token = randomString;
//      login(token)

//     } catch (error) {
//         return res.status(500).json({success:false, error: error.message})
//     }
// }

// awdizToken()

app.post("/register", register)
app.post("/login", login)
app.post("/add-product", addProduct)
app.post("/get-products", getProducts)
app.delete("/delete-product", deleteProduct)


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db...')
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})