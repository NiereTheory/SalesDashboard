import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalesService {

	constructor(private http: HttpClient) { }

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
