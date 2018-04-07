import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './dashboard/dash/dash.component';
import { EntryformComponent } from './newform/entryform/entryform.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
	{ path: 'dashboard', component: DashComponent },
	{ path: 'new', component: EntryformComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})
export class AppRoutingModule {



}
