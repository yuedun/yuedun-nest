import { Sequelize } from 'sequelize-typescript';
import { Log } from '../log/log.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                operatorsAliases: false,
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'issue',
            });
            sequelize.addModels([Log]);
            await sequelize.sync();
            return sequelize;
        },
    },
];