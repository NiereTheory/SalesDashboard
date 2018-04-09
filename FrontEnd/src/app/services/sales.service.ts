import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { LoginService } from './login.service';

@Injectable()
export class SalesService {

    constructor(private http: HttpClient, private loginService: LoginService) { }
    
    updateRequired: boolean = true;
    sKpis;
    sTop;
    sMonthly;
    sRegionally;
    sEmployee;

    getUpdateRequired() {
        return this.updateRequired;
    }

    setUpdateRequired(status: boolean) {
        this.updateRequired = status;
    }

	async getKpis() {
        let kpis = await this.http.get('http://127.0.0.1:3000/api/sales/kpis').toPromise();
        this.sKpis = kpis['kpis'];
        return this.sKpis;
    }

	async getMonthly() {
        let monthly = await this.http.get('http://127.0.0.1:3000/api/sales/monthly').toPromise();
        this.sMonthly = monthly['sales'];
        return this.sMonthly;
	}

	async getRegionally() {
        let regionally = await this.http.get('http://127.0.0.1:3000/api/sales/regionally').toPromise();
        this.sRegionally = regionally['sales'];
        return this.sRegionally;
	}

	async getTop() {
        let top = await this.http.get('http://127.0.0.1:3000/api/sales/top').toPromise();
        this.sTop = top['sales'];
        return this.sTop;
	}

	async getByEmployee(token) {
        const headers = {
            headers: new HttpHeaders({
                'Authorization': this.loginService.userToken.toString()
            })
        }
        let emp = await this.http.get('http://127.0.0.1:3000/api/sales/mine', headers).toPromise();
        this.sEmployee = emp;
        return emp['sales'];
    }
}
