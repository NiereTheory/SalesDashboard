import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	public empsales: any[];
	public topsales: any[];

	constructor(private saleService: SalesService) {

	}

	ngOnInit() {
		this.saleService.getByEmployee()
			.subscribe(data => {
				this.empsales = data['sales'].sort((a,b) => a.SALESUM - b.SALESUM);
			});

		this.saleService.getTop()
			.subscribe(data => {
				this.topsales = data['sales'].sort((a,b) => a.SALESUM - b.SALESUM);
			});
	}
}
