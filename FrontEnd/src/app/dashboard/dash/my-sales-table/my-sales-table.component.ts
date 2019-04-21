import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Sale } from '../../../models/sale';
import { SalesService } from '../../../services/sales.service';

@Component({
    selector: 'app-my-sales-table',
    templateUrl: './my-sales-table.component.html',
    styleUrls: ['./my-sales-table.component.css']
})
export class MySalesTableComponent implements OnInit {

    mySales$: Observable<Sale[]>;
    me: string;
    constructor(private salesService: SalesService) { }

    ngOnInit() {
        this.loadMySales();
    }

    loadMySales() {
        this.mySales$ = this.salesService.sales$.pipe(
            tap(arr => arr.sort((a, b) => b.amount - a.amount)),
            tap(arr => {
                if (!this.me) {
                    this.me = arr[3].fullName
                }
            }),
            map(arr => arr.filter(sale => sale.fullName === this.me)),
        );
    }

}
