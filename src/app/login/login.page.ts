import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { LoginConstants } from '../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private iab:InAppBrowser,private router:Router,private authService:AuthService,private storageService: StorageService,private msalService:MsalService) { }

  loading = false;
  public users: any
  public isUserLoggedIn: boolean;

  ngOnInit() {
    console.log(this.isUserLoggedIn)
    if(this.msalService.instance.getActiveAccount() != null){
      this.isUserLoggedIn = true;
    }
    else{
      this.isUserLoggedIn = false;
    }
         
    this.authService.loading?.subscribe((loading) => {
      this.loading = loading;
    });
  }

  public login(): void {

    // const browser = this.iab.create('https://login.microsoftonline.com/7f7268a4-7179-4a42-9837-40255b1c21e5/oauth2/v2.0/authorize?client_id=8b800a53-c972-469b-9c01-59eebee31936&scope=user.read%20mail.send%20calendars.readwrite%20user.readbasic.all%20people.read%20openid%20profile%20offline_access&redirect_uri=msauth%3A%2F%2Fcom.presidio.vmeet%2FOup4HVnr0SEImNV3%252FuJP8avyTJ0%253D&client-request-id=331ad6dd-468e-46ee-8bf7-ba224b1e8256&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.28.1&client_info=1&code_challenge=vjjnZ2Z6SWV360_h_Lmx9ZzbaqkbmW1tiWT1B-9Hrpc&code_challenge_method=S256&prompt=select_account&nonce=8dc2956f-7417-4d09-8a29-1cae8ddee95e&state=eyJpZCI6Ijc2M2ZhYzc4LWU0M2UtNDM5OS04NGI1LWE3YjAzMzgwYmE1MSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D','_self',{location:'no'})
    // browser.addEventListener("loadstart", (event: any) => {
    //   if ((event.url).indexOf('?token=') !== -1) {
    //     let token = event.url.slice(event.url.indexOf('?token=') + '?token='.length);
    //     // here is your token, now you can close the InAppBrowser
    //     browser.close();
    //   }
    // })
    this.authService.login();
    // this.router.navigate(['/login'])
  }

  public logout():void {
    this.authService.logout();
    
  }
  
  logo = LoginConstants.imgPath.logo;
  carouselImg5 = LoginConstants.imgPath.carouselImg5;
  carouselImg3 = LoginConstants.imgPath.carouselImg3;
  carouselImg4 = LoginConstants.imgPath.carouselImg4;
}
