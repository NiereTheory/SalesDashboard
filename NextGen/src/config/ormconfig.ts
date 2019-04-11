import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'salesdashboard',
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    dropSchema: process.env.NODE_ENV === 'production' ? false : true,
    logging: true,
    entities: [
        'dist/entity/**/*.js'
    ],
    migrations: [
        'src/migration/**/*.ts'
    ],
    subscribers: [
        'src/subscriber/**/*.ts'
    ]
}

export { ormconfig };