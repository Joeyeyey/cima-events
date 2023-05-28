import { Schema, model } from "mongoose";

/**
 * Mongoose Typescript Reference
 * https://mongoosejs.com/docs/typescript.html
 */

/**
 * interface ICimaEvent
 *
 * Interface containing the components for a CIMA Event object
 *
 * @param {string} title - Title for the event
 * @param {string} [description] Description of the event (optional)
 * @param {string} [location] Physical or virtual event location (optional)
 * @param {Date} startDate Event start date/time
 * @param {Date} endDate Event end date/time
 */
export default interface ICimaEvent {
    title: string;
    description?: string;
    location?: string;
    startDate: Date;
    endDate: Date;
}

/**
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
export const CimaEvent = new Schema<ICimaEvent>({
    /* By default, Mongoose adds an _id property to your schemas.
    // _id: ObjectId 

    /* basic string types */
    title: { type: String, required: true },
    description: String,
    location: String,

    /* https://mongoosejs.com/docs/schematypes.html#dates */
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

/**
 * Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document.
 * Models are responsible for creating and reading documents from the underlying MongoDB database.
 *
 * model<ICimaEvent>("cimaevents", CimaEventSchema);
 *
 * The first argument is the singular name of the collection your model is for.
 * Mongoose automatically looks for the plural, lowercased version of your
 * model name.
 */
export const CimaEventModel = model<ICimaEvent>("cimaevents", CimaEvent);
