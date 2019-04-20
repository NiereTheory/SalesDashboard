import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RegionalSales } from '../../../models/regional.sales';
import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../models/sale';

@Component({
    selector: 'app-dash-kpi',
    templateUrl: './kpi.component.html',
    styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

    regionalSales$: Observable<RegionalSales[]>;

    constructor(private salesService: SalesService) { }

    ngOnInit() {
        this.regionalSales$ = this.salesService.sales$.pipe(
            map((arr: Sale[]) => this.groupByRegion(arr)),
            // delay(1000),
        );
    }

    groupByRegion(saleArr) {
        let totalAmount = 0;
        const salesByRegion: RegionalSales[] = [];
        saleArr.forEach(sale => {
            const idx = salesByRegion.findIndex(existingObj => existingObj.region === sale.region);
            if (idx > -1) {
                salesByRegion[idx].summedAmount += sale.amount;
                salesByRegion[idx].saleCount++;
            } else {
                salesByRegion.push(new RegionalSales(sale.region, sale.amount, 1));
            }
            totalAmount += sale.amount;
        });
        salesByRegion.map(m => m.percentOfTotal = Number((m.summedAmount / totalAmount).toFixed(2)));
        salesByRegion.sort((a, b) => a.region.localeCompare(b.region));
        const globalSummedAmount: number = salesByRegion.reduce((a: number, b: RegionalSales) => a + b.summedAmount, 0);
        const globalSaleCount: number = salesByRegion.reduce((a: number, b: RegionalSales) => a + b.saleCount, 0);
        return [...salesByRegion, new RegionalSales('GLOBAL', globalSummedAmount, globalSaleCount)];
    }
}
