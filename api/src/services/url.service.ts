import { HttpError } from "../errors/http.error";
import { IUrl } from "../interfaces/url.interface";
import Url from "../models/url.model";

export class UrlService {
  public find(): Promise<IUrl[]> {
    return Url.find({}).exec();
  }

  public findById(obj: any): Promise<IUrl> {
    return Url.findOne(obj).exec();
  }

  public add(url: IUrl): Promise<IUrl> {
    const newUrl = new Url(url);
    return newUrl.save();
  }

  public async update(id: string, clickCount: number) {
    const updatedUrl:any = await Url.findByIdAndUpdate(id, {clickCount:clickCount});

    if (!updatedUrl) {
      throw new HttpError(`Url with id '${id}' not found`, 404);
    }

    return updatedUrl;
  }

  public async delete(id: string) {
    const deletedUrl: Promise<IUrl> = await Url.findByIdAndDelete(
      id
    ).exec();

    if (!deletedUrl) {
      throw new HttpError(`Url with id '${id}' not found`, 404);
    }

    return deletedUrl;
  }
}
