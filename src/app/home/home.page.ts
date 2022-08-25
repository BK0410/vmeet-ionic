import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth/auth.service';
import { RoomService } from '../services/room/room.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rooms: any = [];

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private msalService: MsalService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('idToken') != null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    console.log(this.isUserLoggedIn);

    this.roomService.fetchAllRooms();
    this.roomService.roomSubject.subscribe((data) => {
      this.rooms = data;
      alert(this.rooms.length);
    });

    // alert(this.rooms.content[0]);
  }

  public users: any;
  public isUserLoggedIn: boolean;

  public logout(): void {
    this.authService.logout();
  }
}
