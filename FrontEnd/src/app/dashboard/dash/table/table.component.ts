import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dash-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	mysales = [
		{ name: 'Ben', region: 'NAM', amt: 500 },
		{ name: 'Ben', region: 'NAM', amt: 600 },
		{ name: 'Ben', region: 'NAM', amt: 300 },
		{ name: 'Ben', region: 'NAM', amt: 800 },
		{ name: 'Ben', region: 'NAM', amt: 1000 }
	];

	topsales = [
		{ name: 'Tina', region: 'NAM', amt: 9000 },
		{ name: 'Tina', region: 'NAM', amt: 8000 },
		{ name: 'Tina', region: 'NAM', amt: 750 },
		{ name: 'Ben', region: 'NAM', amt: 700 },
		{ name: 'Ben', region: 'NAM', amt: 500 }
	];
}
