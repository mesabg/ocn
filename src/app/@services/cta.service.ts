/**
 * Global imports
 */
import { Injectable, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular';

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

	constructor(private appCtrl:App) { }

	public login():void { this.appCtrl.getRootNav().setRoot('app-login-page'); this.appCtrl.getRootNav().push('app-login-page'); }
	public register():void { /*this.appCtrl.getRootNav().setRoot('app-register-page'); this.appCtrl.getRootNav().push('app-register-page');*/ }

	/**
	 * General
	 */
	public generalView():void { this.appCtrl.getRootNav().setRoot('app-general-home-page'); this.appCtrl.getRootNav().push('app-general-register-page'); }

    /**
     * Administrator
     */
	public administratorView():void { this.appCtrl.getRootNav().setRoot('app-administrator-home-page'); this.appCtrl.getRootNav().push('app-administrator-register-page'); }
}
