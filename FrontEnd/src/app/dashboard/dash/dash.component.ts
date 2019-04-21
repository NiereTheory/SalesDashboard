import { Component, OnInit } from '@angular/core';

import { SalesService } from '../../services/sales.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

    defaultStart = '2018-01-01';
    defaultEnd = '2018-03-31';

    constructor(private saleService: SalesService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.router.navigate(['/dashboard'], { queryParams: { startDate: this.defaultStart, endDate: this.defaultEnd } });

        this.route.queryParams.subscribe(qp => this.saleService.getSalesShared(qp['startDate'], qp['endDate']));
    }
}
