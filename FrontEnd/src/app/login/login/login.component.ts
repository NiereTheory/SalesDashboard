import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
        let user = {
            user: loginForm.value.username,
            pass: loginForm.value.password
        }
        this.loginService.validateUser(user)
            .subscribe(data => {
                console.log(data);
                localStorage.setItem("token", data['token']);
                this.router.navigate(['/dashboard']);
            });
    } else {
      console.log('Failed');
    }
  }

  //   onSubmit(entryForm: NgForm) {
  //     if (entryForm.valid) {
  //         this.submitNewDisabled = true;
  //         let sale: Sale = {
  //             Region: entryForm.value.Region,
  //             Employee: entryForm.value.Employee,
  //             Dollars: entryForm.value.Dollars,
  //             Date: `${entryForm.value.day}-${entryForm.value.month}-18`
  //         }
  //         this.newService.addSale(sale)
  //             .subscribe(data => {
  //                 entryForm.reset();
  //                 this.submitNewDisabled = false;
  //                 this.saleService.setUpdateRequired(true);
  //         });
  //     } else {
  //         console.log('Failed');
  //     }    
}
