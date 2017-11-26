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
 * - This service manage the data retrive within the API to get "task" data.
 */
@Injectable()
export class TaskApi {
	constructor(private apiService:ApiService) {}

	/**
	 * Register new task
	 */
	public create(
        title:string, 
        description:string,
        ids:any):Promise<BackendModel>{
		return this.apiService
			.authPost(`tasks`, {
				title: title,
                description: description,
                ids: ids
            })
            .map(response => response.json())
            .toPromise();
	}


	/**
	 * Retrieve all task
	 */
	public async retrieveAll():Promise<BackendModel>{
		return this.apiService
			.authGet(`tasks`)
			.map(response => response.json())
			.toPromise();
	}



	/**
	 * Comment
	 * /comment/:task-id
	 * content
	 */
	public async comment(taskId, content):Promise<BackendModel>{
		return this.apiService
			.authPost(`comment/${taskId}`, {
				content: content
			})
			.map(response => response.json())
			.toPromise();
	}



	/**
	 * Change status
	 * /tasks/change-status
	 * status
	 */
	public async changeStatus(id:any, status:string):Promise<BackendModel>{
		return this.apiService
			.authPut(`tasks/change-status/${id}`, {
				status: status
			})
			.map(response => response.json())
			.toPromise();
	}


	//-- End task
	public async endTask(id:any):Promise<BackendModel>{
		return this.changeStatus(id, 'Finalizada');
	}
}
