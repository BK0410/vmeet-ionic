import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { LoginConstants } from '../shared/constants';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private iab: InAppBrowser, private router: Router, private authService: AuthService, private storageService: StorageService, private msalService: MsalService) { }

  loading = false;
  public users: any
  public isUserLoggedIn: boolean;

  ngOnInit() {
    console.log(this.isUserLoggedIn)
    if (localStorage.getItem('token') != null) {
      this.isUserLoggedIn = true;
    }
    else {
      this.isUserLoggedIn = false;
    }

    this.authService.loading?.subscribe((loading) => {
      this.loading = loading;
    });
  }

  public login(): void {

    const browser = this.iab.create('https://login.microsoftonline.com/7f7268a4-7179-4a42-9837-40255b1c21e5/oauth2/v2.0/authorize?client_id=8b800a53-c972-469b-9c01-59eebee31936&scope=user.read%20mail.send%20calendars.readwrite%20user.readbasic.all%20people.read%20openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A8100&client-request-id=b3232c35-e303-432f-91b3-446725424532&response_mode=fragment&response_type=token&x-client-SKU=msal.js.browser&x-client-VER=2.28.1&client_info=1&code_challenge=ZaNfxhfUZU1WsSpRlAK0vE5XvZIK6PaurPOyWpVZngA&code_challenge_method=S256&prompt=select_account&nonce=8bbd51f4-7bc0-4d8d-864c-b39de6b1f542&state=eyJpZCI6IjBlZmJmMThjLWVmZmUtNDZlMy05ZGVjLTFlMTg2NjEzOWI2MyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D', '_self', { location: 'no' })
    browser.on('loadstart').subscribe((ev: InAppBrowserEvent) => {
      if (0 === ev.url.indexOf('http://localhost:8100')) {
        let tokenFromURL = (ev.url).split("token=")[1];
        let token = tokenFromURL.split("&")[0]
        let decoded_token: any = jwt_decode(token)
        alert(decoded_token.name);
        this.isUserLoggedIn = true;
        alert(token);
        console.log(ev.url);
        browser.close();
        this.router.navigate([''])
        alert("HELLO");
        localStorage.setItem('token', token);
        localStorage.setItem('decded_token', decoded_token)
        alert(localStorage.getItem('token'));
        window.location.reload();
      }
    });
  };


  public logout(): void {
    this.authService.logout();

  }

  logo = LoginConstants.imgPath.logo;
  carouselImg5 = LoginConstants.imgPath.carouselImg5;
  carouselImg3 = LoginConstants.imgPath.carouselImg3;
  carouselImg4 = LoginConstants.imgPath.carouselImg4;
}
