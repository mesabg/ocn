import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import localeES from '@angular/common/locales/es-AR';
registerLocaleData(localeES);

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Layout } from './layout';
import { GuardsModule } from './@guards';
import { ComponentsModule } from './@components';

@NgModule({
  declarations: [
    Layout,
  ],
  imports: [
    BrowserModule,
    GuardsModule,
    ComponentsModule,
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
