import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './dashboard/dash/dash.component';
import { EntryformComponent } from './newform/entryform/entryform.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';

const routes: Routes = [
    { path: 'dashboard', component: DashComponent },
    { path: 'new', component: EntryformComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
