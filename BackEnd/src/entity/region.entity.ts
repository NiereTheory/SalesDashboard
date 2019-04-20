import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'regions' })
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', name: 'long_name', unique: true })
    longName: string;

    @Column({ type: 'text', name: 'short_name' })
    shortName: string;

    @CreateDateColumn({ type: 'date', name: 'created' })
    created: Date;

    @UpdateDateColumn({ type: 'date', name: 'modified' })
    modified: Date;
}
