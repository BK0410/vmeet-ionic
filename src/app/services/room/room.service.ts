import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms: any = [];
  roomSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    this.roomSubject.subscribe((data) => {
      this.rooms = data;
    });
    this.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.roomSubject.next(data);
    });
  }

  fetchAllRooms() {
    return this.getAllRooms().subscribe((data) => {
      this.roomSubject.next(data);
    });
  }

  getAllRooms() {
    return this.http.get(`${environment.apiUrl}/rooms`);
  }
}
