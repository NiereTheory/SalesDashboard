export class RegionalSales {
    region: string;
    summedAmount: number;
    saleCount: number;
    percentOfTotal: number;
    constructor(region: string, summedAmount: number, saleCount: number) {
        this.region = region;
        this.summedAmount = summedAmount;
        this.saleCount = saleCount;
    }
}
