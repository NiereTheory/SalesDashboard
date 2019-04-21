import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
    selectedIdx = 0;
    dateRange: { startDt: string, endDt: string, name: string }[] = [
        { startDt: '2018-01-01', endDt: '2018-03-31', name: 'Q1' },
        { startDt: '2018-04-01', endDt: '2018-06-30', name: 'Q2' },
        { startDt: '2018-07-01', endDt: '2018-09-30', name: 'Q3' },
        { startDt: '2018-10-01', endDt: '2018-12-31', name: 'Q4' },
        { startDt: '2018-01-01', endDt: '2018-12-31', name: 'FY' },
    ]

    constructor(private router: Router) { }

    ngOnInit() {
        // changeDates(this.dateRange[1].startDt, this.dateRange[1].endDt, 0);
    }

    changeDates(startDt: string, endDt: string, idx: number) {
        this.selectedIdx = idx;
        this.router.navigate(['/dashboard'], { queryParams: { startDate: startDt, endDate: endDt } });
    }

}
