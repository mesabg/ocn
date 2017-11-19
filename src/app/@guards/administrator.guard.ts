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
		if (this.authentication.isLoggedIn() && this.authentication.isAdministrator())
			return true;
		else {
			this.authentication.redirect();
			return false;
		}
	}
}
