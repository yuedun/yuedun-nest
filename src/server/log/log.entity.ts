import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export default class Log extends Model<Log> {
    @Column
    mark: string;

}