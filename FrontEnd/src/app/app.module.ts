import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashComponent } from './dashboard/dash/dash.component';
import { KpiComponent } from './dashboard/dash/kpi/kpi.component';
import { ChartComponent } from './dashboard/dash/chart/chart.component';
import { TableComponent } from './dashboard/dash/table/table.component';
import { EntryformComponent } from './newform/entryform/entryform.component';
import { AboutComponent } from './about/about/about.component';

import { SalesService } from './services/sales.service';
import { NewService } from './services/new.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashComponent,
    KpiComponent,
    ChartComponent,
    TableComponent,
    EntryformComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
	  AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SalesService, 
    NewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
