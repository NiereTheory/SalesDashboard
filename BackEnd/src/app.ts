import 'reflect-metadata';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { SalesController } from './controllers/sales.controller';
import { SellerController } from './controllers/seller.controller';
import { RegionController } from './controllers/region.controller';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.disable('etag'); // remove general caching

app.use('/api/v1/sales', SalesController);
app.use('/api/v1/regions', RegionController);
app.use('/api/v1/sellers', SellerController);

export { app };