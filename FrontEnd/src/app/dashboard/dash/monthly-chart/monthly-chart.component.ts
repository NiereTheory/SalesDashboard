import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MonthlySales } from '../../../models/monthly.sales';
import { SalesService } from '../../../services/sales.service';

@Component({
    selector: 'app-monthly-chart',
    templateUrl: './monthly-chart.component.html',
    styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnInit {

    @Input() salesByMonth: MonthlySales[];
    maxHeight = 25;

    constructor() {

    }
    ngOnInit() {
        setTimeout(() => console.log(this.salesByMonth), 2000);
    }

    getMonthlyHeight(h: number) {
        const max = Math.max(...this.salesByMonth.map(x => x.summedAmount));
        return h / max * this.maxHeight - 2; // minus for padding
    }
}
