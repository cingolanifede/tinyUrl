import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tinyUrl';
  address:any;
  result:any;

  constructor(private httpService: HttpService) {}
  
  postUlr(){
    if (!this.address) return;
    const obj = { longUrl: this.address };
    this.httpService.postUrl(obj).subscribe(data => {
      this.result = data.shortUrl;
      console.log(data);
    })        
  }

  getUlr(){
    if (!this.address) return;
    this.httpService.getUrl(this.address).subscribe(data => {
      this.result = data.url;
      console.log(data);
    })        
  }
}
