import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	public monthlysales: any[];
	public maxmonthlysale = Number;
	public regionalsales: any[];
	public maxregionalsale:Number;

	constructor(private saleService: SalesService) {

	}

	ngOnInit() {
		this.saleService.getMonthly()
			.subscribe(data => {
				this.monthlysales = data['sales'];
				let sum = this.monthlysales.reduce((a, b) => a + b.SALESUM, 0);
				// issue chaining in TS and new Dates in sort
				this.monthlysales.map(item => item.PORTION = Math.round(item.SALESUM / sum * 100));
				this.monthlysales.sort((a,b) => a.SALEMONTH - b.SALEMONTH);
				this.maxmonthlysale = Math.max.apply(Math, this.monthlysales.map(item => item.SALESUM));
			});

		this.saleService.getRegionally()
			.subscribe(data => {
				this.regionalsales = data['sales'];
				let sum = this.regionalsales.reduce((a, b) => a + b.SALESUM, 0);
				this.regionalsales.map(item => item.PORTION = Math.round(item.SALESUM / sum * 100));
				this.regionalsales.sort((a,b) => b.SALESUM - a.SALESUM);
				this.maxregionalsale = Math.max.apply(Math, this.regionalsales.map(item => item.SALESUM));
			});
	}

}
