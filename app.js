import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
import connectDB from './configs/db.js'
import fileUploadRoutes from './routes/v1/fileupload/fileuploadRoutes.js'

const app = express()
const port = process.env.PORT || 8000

connectDB()

app.use(fileUploadRoutes)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("uploads"))


app.listen(port, () => console.log(`Server running on port ${port}`));