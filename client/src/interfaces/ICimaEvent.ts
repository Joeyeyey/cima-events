/**
 * interface ICimaEventCreation
 *
 * Interface containing the components for creating an event
 *
 * @param {string} title - Title for the event
 * @param {string} [description] Description of the event (optional)
 * @param {string} [location] Physical or virtual event location (optional)
 * @param {Date} startDate Event start date/time
 * @param {Date} endDate Event end date/time
 */
export interface ICimaEventCreation {
    title: string;
    description?: string;
    location?: string;
    startDate: Date;
    endDate: Date;
}

/**
 * interface ICimaEvent
 *
 * Interface containing the components for an event returned from a MongoDB database
 *
 * @param {Number} _id - Mongoose/MongoDB generated document id
 * @param {string} title - Title for the event
 * @param {string} [description] Description of the event (optional)
 * @param {string} [location] Physical or virtual event location (optional)
 * @param {Date} startDate Event start date/time
 * @param {Date} endDate Event end date/time
 */
export default interface ICimaEvent extends ICimaEventCreation {
    _id: Number;
    title: string;
    description?: string;
    location?: string;
    startDate: Date;
    endDate: Date;
}
