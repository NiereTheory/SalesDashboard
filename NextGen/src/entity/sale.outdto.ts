export class SaleOutDTO {
    amount: number;
    saleDate: Date;
    region: string;
    firstName: string;
    lastName: string;
    constructor(amount, saleDate, region, firstName, lastName) {
        this.amount = amount;
        this.saleDate = saleDate;
        this.region = region;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}