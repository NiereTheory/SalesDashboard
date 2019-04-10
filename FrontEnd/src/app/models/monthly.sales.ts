export class MonthlySales {
    month: string;
    monthInt: number;
    summedAmount: number;
    percentOfTotal?: number;
    constructor(month: string, monthInt: number, summedAmount: number) {
        this.month = month;
        this.monthInt = monthInt;
        this.summedAmount = summedAmount;
    }
}
