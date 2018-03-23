import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalesService {

	constructor(private http: HttpClient) { }

	getSales() {
		return this.http.get('http://127.0.0.1:3000/api/sales');
	}

}
