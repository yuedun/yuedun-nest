import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import Article from '../article/article.entity';

@Table({
    timestamps: true,
    underscored: true,
    // paranoid: true,//set deletedat
    tableName: 'user',
    // charset: 'utf8',
    // collate: 'utf8_unicode_ci'
})
export default class User extends Model<User> {
    @PrimaryKey
    @Column
    id: number;

    @Column({
        type: DataType.STRING,
        comment: '姓名',
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

    @HasMany(() => Article)
    articles: Article[]
}
