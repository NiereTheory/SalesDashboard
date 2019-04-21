import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../models/sale';

@Component({
    selector: 'app-top-sales-table',
    templateUrl: './top-sales-table.component.html',
    styleUrls: ['./top-sales-table.component.css']
})
export class TopSalesTableComponent implements OnInit {

    topSales$: Observable<Sale[]>;
    constructor(private salesService: SalesService) { }

    ngOnInit() {
        this.loadTopSales(this.rowsToGet);
    }

    loadTopSales(rows: number) {
        this.rowsToGet = rows;
        this.topSales$ = this.salesService.sales$.pipe(
            tap(arr => arr.sort((a, b) => b.amount - a.amount))
        );
    }

}
