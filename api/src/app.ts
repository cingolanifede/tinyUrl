import dotenv from 'dotenv';
dotenv.config();
import { MONGO } from "./constants/url.constants";
import { UrlController } from "./controllers/url.controller";
import { UrlService } from "./services/url.service";
import cors from "cors";
import express from "express";
import { handleErrors } from "./middleware/error-handler.middleware";
import mongoose from "mongoose";
import config from './config';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
    this.setErrorHandlingMiddleware();
  }

  private setConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO.url, MONGO.configuration);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    });
  }

  private setControllers() {
    const urlController = new UrlController(new UrlService());
    this.app.use("/api", urlController.router);
  }

  private setErrorHandlingMiddleware() {
    this.app.use(handleErrors);
  }
}

export default new App().app;
