import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Layout } from './layout';
import { GuardsModule } from './@guards';
import { RoutingModule } from './app.routing';

@NgModule({
  declarations: [
    Layout,
  ],
  imports: [
    BrowserModule,
    GuardsModule,
    //RoutingModule,
    IonicModule.forRoot(Layout)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Layout,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: "es-AR"}
  ]
})
export class AppModule {}
