import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    user_name: string;

    @Column('text')
    description: string;

    @Column('text')
    mobile: string;

    @Column('text')
    email: string;

    @Column()
    status: boolean;
}
