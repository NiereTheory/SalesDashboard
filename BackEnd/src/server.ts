import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { app } from './app';
import { ormconfig } from './config/ormconfig';
import { loadDB } from './seed/Seed';

const PORT = process.env.PORT || 3000;

createConnection(ormconfig).then(async connection => {
    app.listen(PORT, () => {
        console.log(`Running on ${PORT}`);
        if (process.env.NODE_ENV !== 'production') {
            loadDB();
        }
    });
}).catch(err => {
    console.log(`Connectivity issue: ${err}`);
});