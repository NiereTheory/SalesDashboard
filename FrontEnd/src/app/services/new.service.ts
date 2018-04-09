import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class NewService {

    regions: any[];
    employees: any[];

    constructor(private http: HttpClient, private loginService: LoginService) { }

	async getRegions() {
        let r = await this.http.get('http://127.0.0.1:3000/api/new/regions').toPromise();
        this.regions = r['regions'];
        return this.regions;
    }

    getLoadedRegions() {
        return this.regions;
    }

	async getEmployees() {
        let e = await this.http.get('http://127.0.0.1:3000/api/new/employees').toPromise();
        this.employees = e['employees'];
        return this.employees;
    }
    
    getLoadedEmployees() {
        return this.employees;
    }

	async addSale(obj) {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.loginService.userToken.toString()
            })
        }
        let res = await this.http.post('http://127.0.0.1:3000/api/new/sale', obj, headers).toPromise();
        return res;
	}
}
