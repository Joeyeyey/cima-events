/////
// This file is our express backend!
/////

import { config } from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import { createEventController } from './controllers/createEventController';
import { getEventsController } from './controllers/getEventsController';
import { deleteEventController } from './controllers/deleteEventController';
import EventModel from './models/Event';

config(); // Function to import .env file to here

const PORT = 4321;
const app = express();


app.use(
    cors({
        origin: '*' // TODO: https://<domain>.com
    })
);

app.use(express.json());

// Default endpoints for validation
app.get("/", (req: Request, res: Response) => {
    res.send('welcome!');
});

app.get("/hello", (req: Request, res: Response) => {
    res.send('hello world!');
});

// Events
app.post('/events', createEventController);
app.get('/events', getEventsController);
app.delete('/events/:id', deleteEventController);
app.put('/events/:id', async (req: Request, res: Response) => {
    const { title, startDate, endDate, location } = req.body;
    const eventId = req.params.id;

    try {
        const event = await EventModel.updateOne({_id: eventId}, { title, startDate, endDate, location });
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const db = mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});