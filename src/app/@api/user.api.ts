/**
 * Global Imports
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Local Imports
 */
import { UserModel, BackendModel } from '../@model';

/**
 * API Import
 */
import { ApiService } from '../../@ms/api';

/**
 * Service description
 * - This service manage the data retrive within the API to get "user" data.
 * - All the URL's are public (no login needed)
 */
@Injectable()
export class UserApi {
	constructor(private apiService:ApiService) {}

	/**
	 * Login
	 * @param username
	 * @param password
	 */
	public login(username:string, password:string):Observable<BackendModel>{
		/*return this.apiService
			.post(`user/login`, {
				username: username,
				password: password
			}).map(response => response.json());*/
		return Observable.create(observer => {
			observer.next({
				state: "success",
				msg: "user succesfully logged in",
				data: {
					token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pc8OpcyBCZXJlbmd1ZXIiLCJlbWFpbCI6Im1vaXNlcy5iZXJlbmd1ZXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiJpcnVnaDkyMzQ4dGciLCJ0eXBlIjoiYWRtaW5pc3RyYXRvciJ9.ZUXEr360spYLgYNmXGgUhaZiyvT61eNzOEO7uUTxpjQ`
				},
				status: 201
			});
			observer.complete();
		});
	}

	/**
	 * Logout
	 */
	public logout():Observable<BackendModel>{
		return this.apiService
			.delete(`user/logout`)
			.map(response => response.json());
	}

	/**
	 * Register
	 */
	public register(user:UserModel):Observable<BackendModel>{
		return this.apiService
			.post(`user/register`, user)
			.map(response => response.json());
	}
}
