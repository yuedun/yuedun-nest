import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Log extends Model<Log> {
    @Column mark: string;

}