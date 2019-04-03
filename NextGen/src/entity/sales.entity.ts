import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Region } from './region.entity';
import { Seller } from './seller.entity';
// We'll assume there is one line per sale and no referential products/sub-volumes to simplify things
@Entity()
export class Sales {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', scale: 2, name: 'amount', })
    amount: number;

    @Column({ type: 'date', name: 'sale_date' })
    saleDate: Date;

    @ManyToOne(type => Region, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'fk_region', referencedColumnName: 'id' })
    region: number;

    @ManyToOne(type => Seller, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'fk_seller', referencedColumnName: 'id' })
    seller: number;

    @CreateDateColumn({ type: 'date', name: 'created' })
    created: Date;

    @UpdateDateColumn({ type: 'date', name: 'modified' })
    modified: Date;
}
