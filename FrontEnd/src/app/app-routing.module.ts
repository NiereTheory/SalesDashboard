import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './dashboard/dash/dash.component';
import { EntryformComponent } from './newform/entryform/entryform.component';
import { AboutComponent } from './about/about/about.component';

const routes: Routes = [
	{ path: 'dashboard', component: DashComponent },
	{ path: 'new', component: EntryformComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})
export class AppRoutingModule {



}
