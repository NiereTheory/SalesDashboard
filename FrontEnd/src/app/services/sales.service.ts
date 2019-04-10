import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { WebResponse } from '../models/web.response';
import { Sale } from '../models/sale';
import { RegionalSales } from '../models/regional.sales';

@Injectable()
export class SalesService {

    constructor(private http: HttpClient, private loginService: LoginService) { }
    salesByRegion$ = new BehaviorSubject<RegionalSales[]>([]);

    getSellers(startDate: string, endDate: string) {
        return this.http.get<WebResponse<Sale>>(`${environment.baseUrl}/sales?startDate=${startDate}&endDate=${endDate}&format=slim`);
    }
}
