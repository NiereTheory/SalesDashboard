import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewService {

	constructor(private http: HttpClient) { }

	getRegions() {
		return this.http.get('http://127.0.0.1:3000/api/new/regions');
	}

	getEmployees() {
		return this.http.get('http://127.0.0.1:3000/api/new/employees');
	}

	addSale(obj) {
		return this.http.post('http://127.0.0.1:3000/api/new/sale', obj, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
}
