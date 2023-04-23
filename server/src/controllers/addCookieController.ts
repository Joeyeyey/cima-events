import { Request, Response } from 'express';
import CookieModel from '../models/Cookie';

export async function addCookieController(req: Request, res: Response) {
    const { count } = req.body;

    try {
        const cookie = await CookieModel.create({ count });
        res.status(201).json(cookie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}