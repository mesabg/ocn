/**
 * Global Imports
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Local Imports
 */
import { BackendModel } from '../@model';

/**
 * API Import
 */
import { ApiService } from '../../@ms/api';

/**
 * Service description
 * - This service manage the data retrive within the API to get "task" data.
 */
@Injectable()
export class CoordsApi {
	constructor(private apiService:ApiService) {}

	/**
	 * Register coords
	 */
	public registerCoords(latitude:any, longitude:any):Promise<BackendModel>{
		return this.apiService
			.authPost(`coords`, {
				latitude: latitude,
                longitude: longitude
            })
            .map(response => response.json())
            .toPromise();
	}
}
