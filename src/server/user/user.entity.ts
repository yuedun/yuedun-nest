import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({
    
})
export default class User extends Model<User>{
    @PrimaryKey
    @Column
    id: number;

    @Column({
        type: DataType.STRING,
        comment: "姓名"
    })
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
