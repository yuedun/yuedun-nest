import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';

@Table({
    timestamps: true,
    underscored: true,
    // paranoid: true,//set deletedat
    tableName: 'website',
    // charset: 'utf8',
    // collate: 'utf8_unicode_ci'
})
export default class Website extends Model<Website> {
    @PrimaryKey
    @Column
    id?: number;

    @Column
    name: string;

    @Column
    category?: string;

    @Column(DataType.TINYINT)
    status?: number;

    @Column
    url?: string;

    @Column
    components: string;

    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @Column
    updatedAt?: Date;
}
