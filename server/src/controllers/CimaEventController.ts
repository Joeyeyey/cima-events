import { Request, Response, response } from "express";
import ICimaEvent, { CimaEventModel } from "../models/CimaEvent";

/* This file contains simple CRUD functions for operating with cimaevents */

/**
 * Get all events
 *
 * @returns Array of object literals that implement the ICimaEvent interface or null
 */
export const GetAllEvents = async () => {
    try {
        const events: ICimaEvent[] = await CimaEventModel.find();
        return events;
    } catch (e) {
        console.error(`ERR w/ GetAllEvents: ${e}`);
        return false;
    }
};

/**
 * Get singular event by document id
 *
 * @param {Number} eventId - Document ID to look up
 * @returns Object literal that implements the ICimaEvent interface or null
 */
export const GetEvent = async (eventId: Number) => {
    try {
        const event: ICimaEvent | null = await CimaEventModel.findById(eventId);
        return event;
    } catch (e) {
        console.error(`ERR w/ GetEvent: ${e}`);
        return false;
    }
};

/**
 * Create a single event
 *
 * @param {ICimaEvent} newEvent - Object literal matching the ICimaEvent interface
 * @returns Response object with a status code
 */
export const CreateEvent = async (newEvent: ICimaEvent) => {
    try {
        const event = await CimaEventModel.create(newEvent);
        return true;
    } catch (e) {
        console.error(`ERR w/ CreateEvent: ${e}`);
        return false;
    }
};

/**
 * Update a single event by document id
 *
 * @param {Number} eventId - Document ID to look up
 * @param {ICimaEvent} updatedEvent - Object literal matching the ICimaEvent interface
 * @returns Response object with a status code
 */
export const UpdateEvent = async (
    eventId: Number,
    updatedEvent: ICimaEvent
) => {
    try {
        const event = await CimaEventModel.findByIdAndUpdate(
            eventId,
            updatedEvent
        );
    } catch (e) {
        console.error(`ERR w/ UpdateEvent: ${e}`);
        return false;
    }
};

/**
 * Delete a single event by document id
 *
 * @param {Number} eventId - Document id to look up
 * @returns Response object with a status code
 */
export async function DeleteEvent(eventId: string) {
    try {
        await CimaEventModel.findByIdAndDelete(eventId);
        return true;
    } catch (e) {
        console.error(`ERR w/ DeleteEvent: ${e}`);
        return false;
    }
}
