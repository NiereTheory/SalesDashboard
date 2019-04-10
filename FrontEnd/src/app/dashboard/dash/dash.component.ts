import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { LoginService } from '../../services/login.service';
import { Sale } from '../../models/sale';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

    constructor(private saleService: SalesService, private loginSerivce: LoginService) {

    }
    sales: Sale[];

    ngOnInit() {
        this.saleService.getSellers('2018-01-01', '2018-12-31').subscribe(res => {
            this.sales = res.data;
            this.sales.map(sale => {
                sale.saleDate = new Date(sale.saleDate);
            });
        });
    }
}
