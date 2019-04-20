import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';

import { MonthlySales } from '../../../models/monthly.sales';
import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../models/sale';

@Component({
    selector: 'app-monthly-chart',
    templateUrl: './monthly-chart.component.html',
    styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnInit {

    monthNames = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };
    maxHeight = 25;

    monthlySales$: Observable<MonthlySales[]>;

    constructor(private salesService: SalesService) {

    }
    ngOnInit() {
        this.monthlySales$ = this.salesService.sales$.pipe(
            map((arr: Sale[]) => this.groupByMonth(arr)),
            // delay(2000)
            // tap(x => console.log(x))
        );
    }


    groupByMonth(saleArr) {
        let totalAmount = 0;
        const salesByMonth: MonthlySales[] = [];
        saleArr.forEach(sale => {
            const monthIdx = sale.saleDate.getMonth();
            const monthName = this.monthNames[monthIdx];
            const idx = salesByMonth.findIndex(existingObj => existingObj.monthInt === monthIdx);
            if (idx > -1) {
                salesByMonth[idx].summedAmount += sale.amount;
            } else {
                salesByMonth.push(new MonthlySales(monthName, monthIdx, sale.amount));
            }
            totalAmount += sale.amount;
        });
        salesByMonth.map(m => m.percentOfTotal = Number((m.summedAmount / totalAmount).toFixed(2)));
        const ratio = 25 / Math.max(...salesByMonth.map(x => x.percentOfTotal));
        salesByMonth.map(m => m.displayHeight = ratio * m.percentOfTotal);
        salesByMonth.sort((a, b) => a.monthInt - b.monthInt);
        return salesByMonth;
    }

    getMonthlyHeight(h: number) {
        const max = Math.max(...this.salesByMonth.map(x => x.summedAmount));
        return h / max * this.maxHeight - 2; // minus for padding
    }
}
