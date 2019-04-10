import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Sale } from '../../../models/sale';
import { MonthlySales } from '../../../models/monthly.sales';
import { RegionalSales } from '../../../models/regional.sales';
import { SalesService } from '../../../services/sales.service';

@Component({
    selector: 'app-dash-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

    componentReady = false;
    @Input() sales: Sale[];
    salesByMonth: MonthlySales[] = [];
    salesByRegion: RegionalSales[];
    monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    maxHeight = 25;

    constructor(private salesService: SalesService) {

    }

    ngOnInit() {
        this.componentReady = true;
    }

    ngOnChanges() {
        if (!this.componentReady) {
            return;
        }

        let totalAmount = 0;
        this.sales.forEach(sale => {
            if (this.salesByMonth.some(r => r.month === this.monthNames[sale.saleDate.getMonth()])) {
                this.salesByMonth
                    .filter(m => m.month === this.monthNames[sale.saleDate.getMonth()])
                    .map(r => {
                        r.summedAmount += sale.amount;
                    });
            } else {
                this.salesByMonth.push(new MonthlySales(
                    this.monthNames[sale.saleDate.getMonth()],
                    sale.saleDate.getMonth(),
                    sale.amount
                )
                );
            }
            totalAmount += sale.amount;
        });

        this.salesByMonth.map(m => m.percentOfTotal = Number((m.summedAmount / totalAmount).toFixed(2)));
        this.salesByMonth.sort((a, b) => a.monthInt - b.monthInt);
    }

    getMaxHeight(h: number) {
        return h / this.maxHeight;
    }

    getRegionHeight(h: number) {
        const max = Math.max(...this.salesByRegion.map(x => x.summedAmount));
        return h / max * this.maxHeight - 3; // minus for padding
    }

}
