/**
 * Global imports
 */
import { Injectable, EventEmitter } from '@angular/core';
//import { Router, NavigationStart } from '@angular/router';

/**
 * Service description
 * - This service manage ALL the CTA's in the site 
 */
@Injectable()
export class CTAService {
	/**
	 * Events
	 */
	public routeChange:EventEmitter<string> = new EventEmitter<string>();
	public actualRoute:string;

	constructor(/*private router:Router*/) {
		/*this.actualRoute = this.router.url;
		this.router.events
			.subscribe((navigation) =>{
				if ((navigation instanceof NavigationStart))
					this.routeChange.emit(navigation.url);
			});*/
	}

	public login():void { /*this.router.navigateByUrl('/login');*/ }
	public register():void { /*this.router.navigateByUrl('/register');*/ }

	/**
	 * General
	 */
	public generalView():void { /*this.router.navigateByUrl('/general');*/ }

    /**
     * Administrator
     */
	public administratorView():void { /*this.router.navigateByUrl('/administrator');*/ }
}
