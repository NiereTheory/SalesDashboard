import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-kpi',
	templateUrl: './kpi.component.html',
	styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

	public sales: any[];

	constructor(private saleService: SalesService) {

	}

	ngOnInit() {
		this.saleService.getSales()
			.subscribe(data => this.sales = data['sales']);
	}

}
