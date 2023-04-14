import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Cookie {
    count: number;
}

export type CookieDocument = mongoose.Document & Cookie;

const CookieSchema = new Schema<CookieDocument>({
    count: Number,
});

const CookieModel = mongoose.model<CookieDocument>('Cookie', CookieSchema);
export default CookieModel;