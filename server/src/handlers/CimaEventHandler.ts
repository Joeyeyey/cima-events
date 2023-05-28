import { Request, Response } from "express";
import ICimaEvent from "../models/CimaEvent";
import {
    CreateEvent,
    DeleteEvent,
    GetAllEvents,
    GetEvent,
    UpdateEvent,
} from "../controllers/cimaeventController";

export async function getAllEvents(req: Request, res: Response) {
    try {
        const events = await GetAllEvents();
        res.json(events);
    } catch (e) {
        console.error(`ERR w/ getAllEvents: ${e}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getEventById(req: Request, res: Response) {
    try {
        const event: ICimaEvent | null | false = await GetEvent(req.body.id);
        res.json(event);
    } catch (e) {
        console.error(`ERR w/ getEventById: ${e}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNewEvent(req: Request, res: Response) {
    const { title, startDate, endDate, location } = req.body;

    try {
        const event = await CreateEvent({
            title,
            startDate,
            endDate,
            location,
        });
        res.status(201).json(event);
    } catch (e) {
        console.error(`ERR w/ createNewEvent: ${e}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteEventById(req: Request, res: Response) {
    const eventId = req.params.id;

    try {
        const result = await DeleteEvent(eventId);
        if (result == true) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.error(`ERR w/ deleteEventById: ${e}`);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
}

export async function updateEventById(req: Request, res: Response) {
    const { title, startDate, endDate, location }: ICimaEvent = req.body;
    const eventId: Number = parseInt(req.params.id);

    try {
        const event = await UpdateEvent(eventId, {
            title,
            startDate,
            endDate,
            location,
        });
        res.status(201).json(event);
    } catch (e) {
        console.error(`ERR w/ updateEventById: ${e}`);
        res.status(500).json({ message: "Internal server error" });
    }
}
