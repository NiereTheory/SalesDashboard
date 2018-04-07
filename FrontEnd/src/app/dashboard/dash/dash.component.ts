import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

	constructor(private saleService: SalesService) {

    }

    sKpis: any[];
    sTop: any[];
    sMonthly: any[];
    sRegionally: any[];
    sEmployee: any[];
    res;

	ngOnInit() {
        if (this.saleService.getUpdateRequired()) {
            const kpis = this.saleService.getKpis();
            const top = this.saleService.getTop();
            const monthly = this.saleService.getMonthly();
            const regionally = this.saleService.getRegionally();
            const employee = this.saleService.getByEmployee();
    
            Observable.forkJoin([kpis, top, monthly, regionally, employee]).subscribe((res) => {
                this.saleService.setAll(res);
                this.sKpis = res[0]['kpis'];
                this.sTop = res[1]['sales'];
                this.sMonthly = res[2]['sales'];
                this.sRegionally = res[3]['sales'];
                this.sEmployee = res[4]['sales'];
                this.saleService.setUpdateRequired(false);
                this.res = res;
            });

        } else {
            this.res = this.saleService.getAll();
            this.sKpis = this.res[0]['kpis']
            this.sTop = this.res[1]['sales'];
            this.sMonthly = this.res[2]['sales'];
            this.sRegionally = this.res[3]['sales'];
            this.sEmployee = this.res[4]['sales'];
        }
	}
}
