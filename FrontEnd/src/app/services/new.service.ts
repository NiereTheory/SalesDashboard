import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewService {

    regions: any[];
    employees: any[];

    constructor(private http: HttpClient) { }

    hasRegions() {
        return this.regions;
    }

	getRegions() {
        return this.http.get('http://127.0.0.1:3000/api/new/regions');
    }

    getLoadedRegions() {
        return this.regions;
    }

    setRegions(regions: any[]) {
        this.regions = regions;
    }
    
    hasEmployees() {
        return this.employees; // prevent reload each time ngoninit
    }

	getEmployees() {
        return this.http.get('http://127.0.0.1:3000/api/new/employees');
    }
    
    getLoadedEmployees() {
        return this.employees;
    }

    setEmployees(employees: any[]) {
        this.employees = employees;
    }

	addSale(obj) {
		return this.http.post('http://127.0.0.1:3000/api/new/sale', obj, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
}
