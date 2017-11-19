/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

/**
 * Local imports
 */
import { ApiService } from './api.service';

/**
 * Authenticated http calls
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig({
		tokenName: 'token',
		tokenGetter: (() => sessionStorage.getItem('token')),
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
		HttpModule
	],
	providers: [
		ApiService,
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		}
	]
})

export class ApiModule { }