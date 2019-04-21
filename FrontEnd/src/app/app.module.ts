import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';

import { DashComponent } from './dashboard/dash/dash.component';
import { KpiComponent } from './dashboard/dash/kpi/kpi.component';
import { EntryformComponent } from './newform/entryform/entryform.component';

import { SalesService } from './services/sales.service';
import { NewService } from './services/new.service';
import { LoginService } from './services/login.service';
import { MonthlyChartComponent } from './dashboard/dash/monthly-chart/monthly-chart.component';
import { RegionalChartComponent } from './dashboard/dash/regional-chart/regional-chart.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { TopSalesTableComponent } from './dashboard/dash/top-sales-table/top-sales-table.component';
import { MySalesTableComponent } from './dashboard/dash/my-sales-table/my-sales-table.component';
import { TimePickerComponent } from './dashboard/dash/time-picker/time-picker.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        DashComponent,
        KpiComponent,
        EntryformComponent,
        LoginComponent,
        LogoutComponent,
        MonthlyChartComponent,
        RegionalChartComponent,
        LoaderComponent,
        TopSalesTableComponent,
        MySalesTableComponent,
        TimePickerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        SalesService,
        NewService,
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
