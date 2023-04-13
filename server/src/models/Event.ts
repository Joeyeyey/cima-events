import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Event {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

// TODO: Below didn't work and I'm not sure why tbh. Keeping here to research
// const EventSchema = new Schema({
//     title: String,
//     startDate: Date,
//     endDate: Date,
//     location: String,
// });

// const EventModel = mongoose.model('Event', EventSchema);
// export default EventModel;

export type EventDocument = mongoose.Document & Event;

const EventSchema = new Schema<EventDocument>({
  title: String,
  startDate: Date,
  endDate: Date,
  location: String,
});

const EventModel = mongoose.model<EventDocument>('Event', EventSchema);

export default EventModel;
