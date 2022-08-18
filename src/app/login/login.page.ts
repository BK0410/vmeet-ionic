import { Component, OnInit } from '@angular/core';
import { LoginConstants } from '../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logo = LoginConstants.imgPath.logo;
  carouselImg5 = LoginConstants.imgPath.carouselImg5;
  carouselImg3 = LoginConstants.imgPath.carouselImg3;
  carouselImg4 = LoginConstants.imgPath.carouselImg4;
}
