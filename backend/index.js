import express from "express";
import dotenv from 'dotenv';
import connectDB from "./utils/dbConnect.js";
import comicRoutes from "./routes/comics.routes.js";

dotenv.config();


const app = express();
app.use(express.json()); 

app.use("/api/comics",comicRoutes)

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});


