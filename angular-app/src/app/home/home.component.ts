import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTitle = 'Tiny Url Generator';
  showLoader=false;
  value = 'Clear me';
  title = 'Angular Form Validation Tutorial';
  
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  longUrl = new FormControl('', 
  [
    Validators.required,
    Validators.pattern(this.urlRegex)
  ]);
  result:any;
  constructor(private httpService: HttpService, private _snackBar: MatSnackBar) { }

  getErrorMessage() {
    if (this.longUrl.hasError('required')) {
      return 'You must enter a valid url format';
    }

    return this.longUrl.hasError('longUrl') ? 'Not a valid url' : '';
  }

  ngOnInit(): void {
  }

  postUlr(){
    if (this.longUrl.invalid) {
      console.log('not valid')
      return;
    }
    this.showLoader = true;
   
    const obj = { longUrl: this.longUrl.value };
    this.httpService.postUrl(obj).subscribe(data => {
      this.result = data.shortUrl;
      this.showLoader = false;
    }, error =>{
      setTimeout(() => {
        this.showLoader = false;
      }, 1000);
      console.log(error);
    })        
  }

  copy(inputElement:any){
    console.log(inputElement)
    inputElement.select();  
    document.execCommand('copy');  
    inputElement.setSelectionRange(0, 0);  
    this.textMessageFunc('Text');    
  }


  // Text Message   
  textMessageFunc(msgText:any){  
    this._snackBar.openFromComponent(ToastComponent, {
      duration: 2000,
    });

  }  
  // getUlr(){
  //   this.httpService.getUrl(this.address).subscribe(data => {
  //     this.result = data.url;
  //     console.log(data);
  //   })        
  // }
}
