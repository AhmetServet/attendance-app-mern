import express, { response } from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import studentRoute from "./routes/studentsRoute.js";

const app = express();

// Middleware for parsing JSON data
app.use(express.json());

app.get("/", (req, res) => {
    // res.send("Hello World!");
    console.log(req);
    return res.status(234).send("MERN Stack App");
});

// Routes
app.use("/students", studentRoute);

// Connect to MongoDB and start the server
mongoose
    .connect(mongoDB_URL)
    .then(() => {
        console.log("App is connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
