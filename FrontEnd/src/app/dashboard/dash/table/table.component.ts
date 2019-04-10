import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../models/sale';

@Component({
    selector: 'app-dash-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

    mySales: Sale[];
    topSales: Sale[];

    @Input() sales: Sale[];
    ready = false;

    constructor() {

    }

    ngOnInit() {
        this.ready = true;
    }

    ngOnChanges() {
        if (!this.ready) {
            return;
        }

        this.sales.map(s => s.fullName = `${s.firstName} ${s.lastName}`);
        this.topSales = this.sales.sort((a, b) => b.amount - a.amount).slice(0, 5);
        const myName = this.topSales[2].fullName;
        this.mySales = this.sales.filter(s => s.fullName === myName).slice(0, 5);
    }
}
