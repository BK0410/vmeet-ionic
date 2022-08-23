import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './../user/user.service';
import { MsalService } from '@azure/msal-angular';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loadingSubject: BehaviorSubject<boolean>;
  public loading: Observable<boolean> | undefined;

  constructor(
    private msalService: MsalService,
    private userService: UserService,
    private router: Router
  ) {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading = this.loadingSubject.asObservable();

    this.msalService.handleRedirectObservable().subscribe((loginResponse) => {
      if (!loginResponse) return;
      this.acquireTokenSilently(loginResponse?.account?.homeAccountId || '');
    });
  }

  public login(): void {
    var loginRequest = {
      scopes: environment.auth.scope, // optional Array<string>
      prompt: 'select_account',
    };

    this.msalService.loginRedirect(loginRequest);
  }

  public logout(): void {
    localStorage.clear();
    this.msalService.logoutRedirect({postLogoutRedirectUri:environment.auth.postLogoutRedirectUri});
  }

  public getUser(): any {
    return this.msalService.instance.getActiveAccount();
  }

  public isUserLoggedIn(): boolean {
    if (this.msalService.instance.getActiveAccount() != null) {
      return true;
    }
    return false;
  }

  acquireTokenSilently(homeAccountId: string) {
    this.loadingSubject.next(true);
    const account = this.msalService.instance.getAccountByHomeId(homeAccountId);
    this.msalService.instance
      .acquireTokenSilent({
        scopes: environment.auth.scope,
        account: account || undefined,
      })
      .then((acquireTokenResult) => {
        localStorage.setItem('accessToken', acquireTokenResult.accessToken);
        localStorage.setItem('idToken', acquireTokenResult.idToken);
        this.msalService.instance.setActiveAccount(acquireTokenResult.account);
        this.userService.checkUser();
      });
  }
}
