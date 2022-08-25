import { Component, OnInit } from '@angular/core';
import { LoginConstants } from '../constants';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.page.html',
  styleUrls: ['./book-room.page.scss'],
})
export class BookRoomPage implements OnInit {
  logo = LoginConstants.imgPath.logo;

  constructor() {}

  ngOnInit() {}
}
