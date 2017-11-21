/**
 * Global imports
 */
import { Injectable } from '@angular/core';
import { 
	CanActivate,
	ActivatedRouteSnapshot, 
	RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Local imports
 */
import { AuthenticationService } from '../@services';

/**
 * Guard description
 * - This guard manages the authentication of a 'administrator' user type
 */
@Injectable()
export class AdministratorGuard implements CanActivate {
	constructor(private authentication:AuthenticationService){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		return new Promise((resolve, reject) => {
			this.authentication.isLoggedIn()
			.then((auth) => {
				if (auth.loggedIn && auth.type === 'administrator')
					resolve(true);
				else {
					this.authentication.redirect();
					resolve(false);
				}
			})		
			.catch((reason) => {
				reject(reason);
			});
		});	
	}
}
