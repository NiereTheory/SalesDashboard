import 'reflect-metadata';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { SalesController } from './controllers/sales.controller';
import { SellerController } from './controllers/seller.controller';
import { RegionController } from './controllers/region.controller';

const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {
    const app = express();

    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.disable('etag'); // remove general caching

    app.use('/api/v1/sales', SalesController);
    app.use('/api/v1/regions', RegionController);
    app.use('/api/v1/sellers', SellerController);

    app.listen(PORT, () => console.log(`Running on ${PORT}`));
}).catch(err => {
    console.log(`Connectivity issue: ${err}`);
});