import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentTitle = 'Admin';
  showLoader=false;
  title = 'Angular Form Validation Tutorial';

  longUrl = new FormControl('', [Validators.required, Validators.nullValidator]);
  result:any;

  constructor(private httpService: HttpService, private _snackBar: MatSnackBar) { }

  getErrorMessage() {
    if (this.longUrl.hasError('required')) {
      return 'You must enter a valid url format';
    }

    return this.longUrl.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.httpService.getAll().subscribe(data => {
      this.result = [];
      data.forEach((element:any) => {
        if (this.compareDates(element)){
          this.result.push(element);
        };  
      });
      this.result.sort((a:any, b:any) => b.clickCount - a.clickCount);
    })  
  }

  compareDates(info:any): boolean{
    const date1 = new Date(info.updatedAt).getTime();
    const OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
       
    if (OneDay > date1) {
      console.log('The yourDate time is less than 1 days from now');
      return true;
    } else if (OneDay < date1) {
      console.log('The yourDate time is more than 1 days from now');
      return false;
    }
    return false;
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
}
