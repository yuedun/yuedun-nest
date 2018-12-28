import { Table, Column, Model } from 'sequelize-typescript';

@Table({})
export default class Log extends Model<Log> {
    @Column
    mark: string;
}
