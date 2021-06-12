import { Document } from "mongoose";

export interface IUrl extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  clickCount: number;
}

