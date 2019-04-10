import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Sale } from '../../../models/sale';
import { RegionalSales } from '../../../models/regional.sales';
import { SalesService } from '../../../services/sales.service';

@Component({
    selector: 'app-regional-chart',
    templateUrl: './regional-chart.component.html',
    styleUrls: ['./regional-chart.component.css']
})
export class RegionalChartComponent implements OnInit {

    maxHeight = 25;
    @Input() salesByRegion: RegionalSales[];

    constructor(private salesService: SalesService) {

    }

    ngOnInit() {
        this.salesService.salesByRegion$.subscribe(data => this.salesByRegion = data.filter(r => r.region !== 'Global'));
    }

    getRegionHeight(h: number) {
        const max = Math.max(...this.salesByRegion.map(x => x.summedAmount));
        return h / max * this.maxHeight - 3; // minus for padding
    }

}
