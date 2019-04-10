import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SalesService } from '../../services/sales.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private router: Router, private saleService: SalesService) { }

    ngOnInit() { }

    //   async onSubmit(loginForm: NgForm) {
    //     if (loginForm.valid) {
    //         let user = {
    //             user: loginForm.value.username,
    //             pass: loginForm.value.password
    //         }
    //         try {
    //             let userResponse = await this.loginService.validateUser(user);
    //             this.saleService.setUpdateRequired(true);
    //             this.router.navigate(['/dashboard']);
    //         } catch (err) {
    //             alert("Invalid credentials!")
    //         }

    //     } else {
    //       console.log('Failed');
    //     }
    //   }  
}
