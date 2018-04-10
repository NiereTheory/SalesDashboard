import { Component, OnInit, Input } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    @Input() sMonthly: any[];
    @Input() sRegionally: any[];

	constructor() {

    }
    
    ngOnInit() { 
    }

	getMaxHeight() {
        return Math.max.apply(Math, this.sRegionally.map(item => item.PCT/2));
	}

}
