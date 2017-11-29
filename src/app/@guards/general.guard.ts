/**
 * Global imports
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Local imports
 */
import { AuthenticationService } from '../@services';

/**
 * Guard description
 * - This guard manages the authentication of a 'general' user type
 */
@Injectable()
export class GeneralGuard {
	constructor(private authentication:AuthenticationService){}
/*
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		return new Promise((resolve, reject) => {
			this.authentication.isLoggedIn()
			.then((auth) => {
				if (auth.loggedIn && auth.type === 'general')
					resolve(true);
				else {
					resolve(false);
				}
			})	
			.catch((reason) => {
				reject(reason);
			});
		});	
	}*/
}
