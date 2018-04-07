import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SalesService {

    constructor(private http: HttpClient) { }
    
    updateRequired: boolean = true;
    res;

    getUpdateRequired() {
        return this.updateRequired;
    }

    setUpdateRequired(status: boolean) {
        this.updateRequired = status;
    }

    setAll(response) {
        this.res = response;
    }

    getAll() {
        return this.res;
    }

	getKpis() {
		return this.http.get('http://127.0.0.1:3000/api/sales/kpis');
    }

	getMonthly() {
		return this.http.get('http://127.0.0.1:3000/api/sales/monthly');
	}

	getRegionally() {
		return this.http.get('http://127.0.0.1:3000/api/sales/regionally');
	}

	getTop() {
		return this.http.get('http://127.0.0.1:3000/api/sales/top');
	}

	getByEmployee() {
		return this.http.get('http://127.0.0.1:3000/api/sales/1');
	}

}
