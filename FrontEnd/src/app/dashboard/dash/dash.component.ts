import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';

@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

	// public sales: any[];
	public sales: any[];

	constructor(private saleService: SalesService) {

	}

	ngOnInit() {
		this.saleService.getSales()
			.subscribe(data => { this.sales = data['sales']});
	}

}
