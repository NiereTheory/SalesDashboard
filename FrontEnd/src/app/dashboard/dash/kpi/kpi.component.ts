import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Sale } from '../../../models/sale';
import { RegionalSales } from '../../../models/regional.sales';
import { SalesService } from '../../../services/sales.service';

@Component({
    selector: 'app-dash-kpi',
    templateUrl: './kpi.component.html',
    styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnChanges, OnInit {

    componentReady = false;
    @Input() sales: Sale[];
    salesByRegion: RegionalSales[] = [];

    constructor(private salesService: SalesService) {

    }

    ngOnInit() {
        this.componentReady = true;
    }

    ngOnChanges() {
        if (!this.componentReady) {
            return;
        }

        const totalAmount = this.groupByRegion(this.sales);

        this.salesByRegion.map(m => m.percentOfTotal = Number((m.summedAmount / totalAmount).toFixed(2)));
        this.salesByRegion.push(new RegionalSales('Global', totalAmount, this.sales.length));
        this.salesService.salesByRegion$.next(this.salesByRegion);
    }

    groupByRegion(saleArr) {
        let totalAmount = 0;
        this.sales.forEach(sale => {
            if (this.salesByRegion.some(r => r.region === sale.region)) {
                this.salesByRegion
                    .filter(n => n.region === sale.region)
                    .map(r => {
                        r.summedAmount += sale.amount;
                        r.saleCount++;
                    });
            } else {
                this.salesByRegion.push(new RegionalSales(sale.region, sale.amount, 1));
            }
            totalAmount += sale.amount;
        });

        return totalAmount;
    }
}
