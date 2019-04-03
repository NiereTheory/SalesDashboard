import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'sellers' })
export class Seller {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', name: 'first_name' })
    firstName: string = '';

    @Column({ type: 'text', name: 'last_name' })
    lastName: string = '';

    @Column({ type: 'date', default: new Date(), name: 'hire_date' })
    hireDate: Date = new Date();

    @CreateDateColumn({ type: 'date', name: 'created' })
    created: Date;

    @UpdateDateColumn({ type: 'date', name: 'modified' })
    modified: Date;
}
