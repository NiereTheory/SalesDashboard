import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share, shareReplay, publishReplay } from 'rxjs/operators';

import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { WebResponse } from '../models/web.response';
import { Sale } from '../models/sale';
import { Observable, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class SalesService {

    private salesSubject: Subject<Sale[]> = new ReplaySubject<Sale[]>(1);
    sales$: Observable<Sale[]> = this.salesSubject.asObservable(); // re-packed

    constructor(private http: HttpClient, private loginService: LoginService) { }

    getSalesShared(startDate: string, endDate: string) {
        return this.http.get<WebResponse<Sale>>(`${environment.baseUrl}/sales?startDate=${startDate}&endDate=${endDate}&format=slim`).pipe(
            map(sales => sales.data
                .map(sale => {
                    sale.saleDate = new Date(sale.saleDate);
                    sale.fullName = `${sale.firstName} ${sale.lastName}`;
                    return sale;
                })
            ),
        ).subscribe(res => this.salesSubject.next(res)); // unpacked
    }

    setSales(arr) {
        this.salesSubject.next(arr);
    }
}
