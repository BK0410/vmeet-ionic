import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService:AuthService,private msalService:MsalService) {}

  ngOnInit() {
    console.log(this.isUserLoggedIn)
    if(localStorage.getItem('accessToken') != null){
      this.isUserLoggedIn = true;
    }
    else{
      this.isUserLoggedIn = false;
    }
    alert(this.isUserLoggedIn)
  }

  public users: any
  public isUserLoggedIn: boolean;

  public logout():void {
    this.authService.logout();
  }

}
