import { Request, Response } from 'express';
import EventModel from '../models/Event';

export async function getEventsController(req: Request, res: Response) {
    try {
        const events: Event[] = await EventModel.find();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}