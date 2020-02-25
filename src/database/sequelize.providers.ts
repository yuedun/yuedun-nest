import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';

/**
 * 在该提供者中需要使用配置提供者，首先需要再database.module.ts中imports对应的ConfigModule，然后在该提供者中使用inject注入，
 * useFactory参数传入ConfigService就可以使用了
 */
export const databaseProviders = [
    {
        inject: [ConfigService],
        provide: 'Sequelize',
        useFactory: async (config: ConfigService) => {
            const host = config.get('DATABASE_HOST');
            const username = config.get('DATABASE_USER');
            const password = config.get('DATABASE_PASSWORD');
            const database = config.get('DATABASE_DATABASE');
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host,
                port: 3306,
                username,
                password,
                database,

                //读写分离
                // replication: {
                //     read: [
                //         { host, username, password },
                //     ],
                //     write: { host, username, password }
                // },
                pool: { // If you want to override the options used for the read/write pool you can do so here
                    max: 20,
                    idle: 30000
                },
                // modelPaths: [__dirname + '/../**/*.entity.ts'],//这3中方式都可以，需要model export default
            });
            // sequelize.addModels([Log, User, Article]);//这3中方式都可以
            sequelize.addModels([__dirname + '/../**/*.entity.ts']); // 这3中方式都可以，需要model export default
            // await sequelize.sync();
            return sequelize;
        },
    },
];
