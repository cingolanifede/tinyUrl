import { NextFunction, Request, Response, Router } from "express";
import { UrlService } from "../services/url.service";
import shortid from "shortid";
import validUrl from "valid-url";
import config from "../config";
import { IUrl } from "../interfaces/url.interface";

export class UrlController {
  public router = Router();
  constructor(private UrlService: UrlService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/health").get(this.health);
    
    this.router.route("/").post(this.add);
    
    this.router.route("/").get(this.findAll);
    this.router.route("/:id").get(this.findByShortUrl);
  }

  private health = (_: Request, res: Response) => {
    res.status(200).send({status: 'alive'});
  };
  
  private findAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const urls = await this.UrlService.find();
      res.send(urls);
    } catch (e) {
      next(e);
    }
  };

  private findByShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shortUrlCode  = req.params.id;
      const url: IUrl = await this.UrlService.findById({ urlCode: shortUrlCode });
        if (url) {
          let clickCount = url.clickCount;
          clickCount++;
          await this.UrlService.update(url._id, clickCount);
          return res.redirect(url.longUrl);
        } else {
          return res.status(400).send("The url doesn't exists.");
        }
    } catch (e) {
      next(e);
    }
  };

  private add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { longUrl } = req.body;
      if (!longUrl) res.status(404).send({err:'missing data'});
      if(!validUrl.isUri(config.BASE_URL)){
        return res.status(401).send("Internal error.");
      }
      
      if(validUrl.isUri(longUrl)){
        try{
          const urlCode = shortid.generate();
          const url = await this.UrlService.findById({longUrl : longUrl});
          if(url){
              return res.status(200).send(url);
          }else{
            const clickCount = 0;
              const shortUrl = `${config.BASE_URL}/${urlCode}`;                  
              const obj:any = { longUrl, shortUrl, urlCode, clickCount };
              await this.UrlService.add(obj);
              res.status(200).send({ longUrl, shortUrl, urlCode, clickCount });
          }
        }catch(err){
            console.error(err.message);
            return res.status(500).send(`Internal Server error ${err.message}`);
        }
      }else{
        res.status(400).send("Invalid URL.");
      }    
    } catch (e) {
      next(e);
    }
  };
  
  // private delete = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const deleteUrlResult = await this.UrlService.delete(
  //       req.params.id
  //     );
  //     res.send(deleteUrlResult);
  //   } catch (e) {
  //     next(e);
  //   }
  // };
    // private update = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const updateUrlResult = await this.UrlService.update(
  //       req.params.id,
  //       req.body
  //     );
  //     res.send(updateUrlResult);
  //   } catch (e) {
  //     next(e);
  //   }
  // };

}
