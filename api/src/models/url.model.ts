import { Schema, Model, model } from "mongoose";

import { IUrl } from "../interfaces/url.interface";

export const UrlSchema = new Schema(
  {
    urlCode: { type: String },
    longUrl: { type: String },
    shortUrl: { type: String },
    clickCount: { type: Number },
  },
  { versionKey: false,
    timestamps: true 
  },  
);

const Url = model<IUrl>("Url", UrlSchema);

export default Url;
