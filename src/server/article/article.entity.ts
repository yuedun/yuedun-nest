import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import User from '../user/user.entity';

@Table({
    timestamps: true,
    underscored: true,
    // paranoid: true,//set deletedat
    tableName: 'article',
    // charset: 'utf8',
    // collate: 'utf8_unicode_ci'
})
export default class Article extends Model<Article> {
    @PrimaryKey
    @Column
    id?: number;

    @ForeignKey(() => User)
    @Column
    user_id?: number;

    @Column
    title: string;

    @Column(DataType.TEXT)
    content?: string;

    @Column(DataType.TINYINT)
    status?: number;

    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @Column
    updatedAt?: Date;
}
