import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
    
})
export default class Article extends Model<Article>{
    @PrimaryKey
    @Column
    id: number;

    @Column
    user_name: string;

    @Column
    description: string;

    @Column
    mobile: string;

    @Column
    email: string;

    @Column
    status: boolean;
}
