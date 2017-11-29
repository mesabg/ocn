/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

/**
 * Local imports
 */
import { ApiService } from './api.service';

/**
 * Authenticated http calls
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions, storage:Storage) {
	return new AuthHttp(new AuthConfig({
		tokenName: 'token',
		tokenGetter: (() => storage.get('token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

/**
 * Module description
 * - This module contains the main http calls to the api
 */
@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		IonicStorageModule.forRoot()
	],
	providers: [
		ApiService,
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions, Storage]
		}
	]
})

export class ApiModule { }