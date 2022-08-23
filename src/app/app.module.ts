import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,MsalModule,
    HttpClientModule],
  providers: [InAppBrowser,{
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory,
  },
  MsalService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.auth.clientId,
      redirectUri: environment.auth.redirectUri,
      postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
      authority: environment.auth.authority + environment.auth.tenantId,
      navigateToLoginRequestUrl: environment.auth.navigateToLoginRequestUrl,
    },
    cache: {
      cacheLocation: environment.auth.cacheLocation,
      storeAuthStateInCookie: environment.auth.storeAuthStateInCookie,
    },
  });
}
