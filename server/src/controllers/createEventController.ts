import { Request, Response } from 'express';
import EventModel from '../models/Event';

export async function createEventController(req: Request, res: Response) {
    const { title, startDate, endDate, location } = req.body;

    try {
        const event = await EventModel.create({ title, startDate, endDate, location });
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}