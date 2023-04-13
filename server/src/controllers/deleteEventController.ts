import { Request, Response } from 'express';
import EventModel from '../models/Event';

export async function deleteEventController(req: Request, res: Response) {
    const eventId = req.params.id;
  
    try {
      const result = await EventModel.deleteOne({ _id: eventId });
      if (result.deletedCount === 1) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
}