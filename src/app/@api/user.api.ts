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
import { ApiService, LazyParser, ServerError } from '../../@ms/api';

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
		return this.apiService
			.post(`user/login`, {
				username: username,
				password: password
			}).map(response => response.json());
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
