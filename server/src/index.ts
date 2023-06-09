/////
// This file is our express backend!
/////

import { config } from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { addCookieController } from "./controllers/addCookieController";
import CookieModel from "./models/Cookie";
import {
    createNewEvent,
    deleteEventById,
    getAllEvents,
    getEventById,
    updateEventById,
} from "./handlers/CimaEventHandler";

config(); // Function to import .env file to here

const PORT = 4321;
const app = express();

app.use(
    cors({
        origin: "*", // TODO: https://<domain>.com
    })
);

app.use(express.json());

// Default endpoints for validation
app.get("/", (req: Request, res: Response) => {
    res.send("welcome!");
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("hello world!");
});

// Cookie Clicker
app.get("/cookie", async (req, res) => {
    try {
        const cookie: number[] = await CookieModel.find();
        res.json(cookie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/cookie", addCookieController);
app.put("/cookie/:id", async (req: Request, res: Response) => {
    const { count } = req.body;
    const cookieId = req.params.id;

    try {
        const newCookie = await CookieModel.updateOne(
            { _id: cookieId },
            { count }
        );
        res.status(201).json(newCookie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// CimaEvents
app.get("/events", getAllEvents);
app.get("/events/:id", getEventById);

app.post("/events", createNewEvent);

app.delete("/events/:id", deleteEventById);

app.put("/events/:id", updateEventById);

const db = mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
