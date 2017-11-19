/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { 
	Routes, 
	RouterModule } from '@angular/router';

/**
 * Local imports
 */
import { Layout } from './layout';

const routes: Routes = [{
    path: '',
	component: Layout
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ]
})
export class AdministratorRoutingModule { }
