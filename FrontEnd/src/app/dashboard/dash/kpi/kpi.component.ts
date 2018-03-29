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
			.subscribe(data => {
				this.kpis = data['kpis'].sort((a,b) => a.SALESUM - b.SALESUM);
				let target = this.kpis.splice(this.kpis.findIndex(item => item.SALEREGION == 'TARGET' || item.SALEREGION == 'GLOBAL', 2))
				target.sort((a,b) => a.SALEREGION.localeCompare(b.SALEREGION));
				this.kpis = this.kpis.concat(target);
				console.log(this.kpis);
			});
	}

}