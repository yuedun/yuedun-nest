import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class Log extends Model<Log> {
    @Column mark: string;

}