import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';

@Component({
	selector: 'dash-kpi',
	templateUrl: './kpi.component.html',
	styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

	public kpis: any[];

	constructor(private saleService: SalesService) {

	}

	ngOnInit() {
		this.saleService.getKpis()
			.subscribe(
				data => {
				// this.kpis = data['kpis'].sort((a,b) => a.SALESUM - b.SALESUM);
					this.kpis = data['kpis'];
					this.kpis.sort((a,b) => a.SALEREGION.localeCompare(b.SALEREGION));
					let globalObj = this.kpis.splice(this.kpis.findIndex(item => item.SALEREGION === 'GLOBAL'), 1);
					let targetObj = this.kpis.splice(this.kpis.findIndex(item => item.SALEREGION === 'TARGET'), 1);
					this.kpis = this.kpis.concat(globalObj, targetObj);
				}
			);
	}

}