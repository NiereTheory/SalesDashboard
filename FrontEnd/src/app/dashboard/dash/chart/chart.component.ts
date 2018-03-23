import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dash-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	lineChartData = [
		{ data: [100, 120, 88], label: 'Sales' }
	];
	lineChartLabels = ['Jan', 'Feb', 'Mar'];
	ChartOptions = {
		responsive: true,
		maintainAspectRatio: true,
	};

	//

	barChartData = [
		{ data: [100, 130, 88], label: 'ASPAC' },
		{ data: [98, 120, 85], label: 'EMEA' },
		{ data: [110, 133, 98], label: 'LATAM' },
		{ data: [120, 120, 88], label: 'NAM' }
	];
	barChartLabels = ['Jan', 'Feb', 'Mar'];

}
