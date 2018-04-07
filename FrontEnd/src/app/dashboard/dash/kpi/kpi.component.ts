import { Component, OnInit, Input } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-kpi',
	templateUrl: './kpi.component.html',
	styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

    @Input() sKpis: any[];

	constructor() {

	}

	ngOnInit() {
		
	}

}