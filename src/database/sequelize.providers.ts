import { Sequelize } from 'sequelize-typescript';
import { default as Log } from 'server/log/log.entity';
import { default as User } from 'server/user/user.entity';
import { default as Article } from 'server/article/article.entity';

export const databaseProviders = [
    {
        provide: 'Sequelize',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'issue',
                // modelPaths: [__dirname + '/../**/*.entity.ts'],//这3中方式都可以，需要model export default
            });
            // sequelize.addModels([Log, User, Article]);//这3中方式都可以
            sequelize.addModels([__dirname + '/../**/*.entity.ts']); // 这3中方式都可以，需要model export default
            // await sequelize.sync();
            return sequelize;
        },
    },
];
