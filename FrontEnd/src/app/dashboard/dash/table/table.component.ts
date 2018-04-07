import { Component, OnInit, Input } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	public empsales: any[];
    public topsales: any[];
    
    @Input() sTop: any[];
    @Input() sEmployee: any[];

	constructor() {

	}

	ngOnInit() {

	}
}
