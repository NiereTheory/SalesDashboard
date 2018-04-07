import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

    validateUser(user) {
        console.log('validating user');
        return this.http.post('http://127.0.0.1:3000/api/login', user, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }

}
