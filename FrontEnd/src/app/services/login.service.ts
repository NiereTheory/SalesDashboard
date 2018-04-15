import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }
    
    userToken: String;
    userID: Number;
    
    async validateUser(user) {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        let activeUser = await this.http.post('http://127.0.0.1:3000/api/login', user, headers).toPromise();
        this.userToken = activeUser['token'];
        localStorage.setItem('salesdashtoken', this.userToken.toString());
        this.userID = activeUser['userID'];
    }

    async validateToken() {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        try {
            console.log()
            let activeUser = await this.http.post('http://127.0.0.1:3000/api/login/valid', localStorage.getItem('salesdashtoken'), headers).toPromise();
            return '123';
        }
        catch (err) {
            return false;
        }
    }

    logoutUser() {
        this.userID = undefined;
        this.userToken = undefined;
    }

}
