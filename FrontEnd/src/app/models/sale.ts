export interface Sale {
    firstName: string;
    lastName: string;
    amount: number;
    saleDate: Date;
    region: string;
    fullName?: string;
    created?: Date;
    modified?: Date;
}