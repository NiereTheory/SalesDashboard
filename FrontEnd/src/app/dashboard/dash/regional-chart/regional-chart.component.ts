import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RegionalSales } from '../../../models/regional.sales';
import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../models/sale';

@Component({
    selector: 'app-regional-chart',
    templateUrl: './regional-chart.component.html',
    styleUrls: ['./regional-chart.component.css']
})
export class RegionalChartComponent implements OnInit {

    maxHeight = 25;
    regionalSales$: Observable<RegionalSales[]>;
    constructor(private salesService: SalesService) {
    }

    ngOnInit() {
        this.regionalSales$ = this.salesService.sales$.pipe(
            map((arr: Sale[]) => this.groupByRegion(arr)),
            // tap((x) => console.log(x))
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
        const ratio = 25 / Math.max(...salesByRegion.map(x => x.percentOfTotal));
        salesByRegion.map(m => m.displayHeight = ratio * m.percentOfTotal);
        return salesByRegion;
    }

}
