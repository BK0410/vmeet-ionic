import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  checkUser() {
    this.http
      .get(`${environment.graphApiUrl}/me`)
      .subscribe((response: any) => {
        this.http
          .post(`${environment.apiUrl}/users/me`, {
            name: `${response.givenName} ${response.surname}`,
            email: response.mail,
            designation: response.jobTitle,
            location: response.officeLocation,
            objectId: response.id,
          })
          .subscribe((response: any) => {
            this.storageService.saveData('user', JSON.stringify(response));
            if (response && response.isAdmin) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          });
      });
  }

  public isAdmin(): boolean {
    const user = JSON.parse(this.storageService.getData('user') || '{}');
    if (user && user.isAdmin !== undefined) {
      return user.isAdmin;
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    return false;
  }
}
