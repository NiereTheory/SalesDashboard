import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dash-kpi',
	templateUrl: './kpi.component.html',
	styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	cards = [
		{ region: 'GLOBAL', count: 180, sum: 35000 },
	  	{ region: 'ASPAC', count: 50, sum: 605 },
		{ region: 'EMEA', count: 24, sum: 220 },
		{ region: 'LATAM', count: 60, sum: 707 },
		{ region: 'NAM', count: 85, sum: 887 }
	]

}
