import express from "express";
import colors from "colors";  // Ensure you have this package installed if you are using it
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

const app = express();

// Configure environment variables
dotenv.config();

// Database config
connectDB();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to my store");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green);
});
