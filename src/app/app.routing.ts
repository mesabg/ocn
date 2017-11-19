/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { 
	Routes, 
	RouterModule } from '@angular/router';

/**
 * Modules imports
 */
import { GeneralPagesModule } from './@general-pages';

/**
 * Guards import
 */
import { 
    GeneralGuard,
	AdministratorGuard } from './@guards';

/**
 * Pages import
 */
import { 
	LoginPage,
	RegisterPage } from './@general-pages';

/**
 * Local imports
 */
import { Layout } from './layout';

const routes: Routes = [{
	path: '',
	children: [
		{ path: '', redirectTo: 'login', pathMatch:'full' },
		{ path: 'login', component: LoginPage },
		{ path: 'register', component: RegisterPage },

		//-- Lazy load modules
		{ path: 'general', loadChildren: './@users/general/general.module#GeneralModule', canActivate:[GeneralGuard] },
		{ path: 'administrator', loadChildren: './@users/administrator/administrator.module#AdministratorModule', canActivate:[AdministratorGuard] }
	]
}];

@NgModule({
	imports: [
		GeneralPagesModule,
		RouterModule.forRoot(routes, {useHash: true}) 
	],
	exports: [ RouterModule ]
})
export class RoutingModule { }
