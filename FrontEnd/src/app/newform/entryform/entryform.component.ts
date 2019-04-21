import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NewService } from '../../services/new.service';
import { SalesService } from '../../services/sales.service';

// import { Sale } from '../../models/newsales';


@Component({
    selector: 'app-entryform',
    templateUrl: './entryform.component.html',
    styleUrls: ['./entryform.component.css']
})
export class EntryformComponent implements OnInit {

    constructor(
        private newService: NewService,
        private saleService: SalesService,
        private router: Router
    ) { }

    public months: any[];
    public regions: any[];
    public employees: any[];
    public submitNewDisabled: boolean;

    onSubmit() {
        // TODO
    }

    // async onSubmit(entryForm: NgForm) {
    // 	if (entryForm.valid) {
    // 		this.submitNewDisabled = true;
    // 		let sale: Sale = {
    // 			Region: entryForm.value.Region,
    // 			Employee: entryForm.value.Employee,
    // 			Dollars: entryForm.value.Dollars,
    // 			Date: `${entryForm.value.day}-${entryForm.value.month}-18`
    //         }
    //         try {
    //             let x = await this.newService.addSale(sale);
    //             entryForm.reset();
    //         }
    //         catch (err) {
    //             if (err.status == 401) {
    //                 alert('Login expired - sending you there now');
    //                 this.router.navigate(['/login']);
    //             } else {
    //                 alert('Looks like you have some invalid input data...maybe a bad date? Try again!');
    //             }
    //         }
    //         finally {
    //             this.submitNewDisabled = false;
    //             this.saleService.setUpdateRequired(true);
    //         } 
    // 	} else {
    // 		console.log('Failed');
    // 	}    
    // }

    async ngOnInit() {
        this.months = [
            { name: 'January', val: 'JAN' },
            { name: 'February', val: 'FEB' },
            { name: 'March', val: 'MAR' }
            // ,{ name: 'April', val: 'ARP' },
            // { name: 'May', val: 'MAY' },
            // { name: 'June', val: 'JUN' },
            // { name: 'July', val: 'JUL' },
            // { name: 'August', val: 'AUG' },
            // { name: 'September', val: 'SEP' },
            // { name: 'October', val: 'OCT' },
            // { name: 'November', val: 'NOV' },
            // { name: 'December', val: 'DEC' }
        ];

        if (this.newService.getLoadedEmployees()) {
            this.employees = this.newService.getLoadedEmployees();
        } else {
            this.employees = await this.newService.getEmployees();
        }
    }
}
