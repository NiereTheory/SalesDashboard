import { Component, OnInit } from '@angular/core';
import { NewService } from '../../services/new.service';
import { NgForm } from '@angular/forms';
import { Sale } from '../../models/newsales';

@Component({
	selector: 'app-entryform',
	templateUrl: './entryform.component.html',
	styleUrls: ['./entryform.component.css']
})
export class EntryformComponent implements OnInit {

	constructor(private newService: NewService) { }
	
	public months: any[];
	public regions: any[];
	public employees: any[];
	public submitNewDisabled: boolean;
	
	onSubmit(entryForm: NgForm) {
		if (entryForm.valid) {
			this.submitNewDisabled = true;
			let sale: Sale = {
				Region: entryForm.value.Region,
				Employee: entryForm.value.Employee,
				Dollars: entryForm.value.Dollars,
				Date: `${entryForm.value.day}-${entryForm.value.month}-18`
			}
			this.newService.addSale(sale)
				.subscribe(data => {
				entryForm.reset();
				this.submitNewDisabled = false;
			});
		} else {
			console.log('Failed');
		}    
	}
	
	ngOnInit() {
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
	
	this.newService.getEmployees()
		.subscribe(
			data => {
				this.employees = data['employees'];
			}
		);

	this.newService.getRegions()
		.subscribe(
			data => {
				this.regions = data['regions'];
			}
		);
	}
	
  
  

}
