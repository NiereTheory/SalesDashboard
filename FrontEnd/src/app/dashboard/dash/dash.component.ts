import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';

@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

	constructor(private saleService: SalesService, private loginSerivce: LoginService) {

    }

    sKpis;
    sTop;
    sMonthly;
    sRegionally;
    sEmployee;
    res;

	async ngOnInit() {
        if (this.saleService.getUpdateRequired()) {
            this.sKpis = await this.saleService.getKpis();
            this.sMonthly = await this.saleService.getMonthly();
            this.sRegionally = await this.saleService.getRegionally();
            this.sTop = await this.saleService.getTop();
            try {
                this.sEmployee = await this.saleService.getByEmployee(this.loginSerivce.userToken);
            } catch(err) {
                this.sEmployee = undefined;
            }
            //TODO maybe a promise.all here?
        } else {
            this.sKpis = this.saleService.sKpis;
            this.sMonthly = this.saleService.sMonthly;
            this.sRegionally = this.saleService.sRegionally;
            this.sTop = this.saleService.sTop;
            this.sEmployee = this.saleService.sEmployee;
        }
	}
}
