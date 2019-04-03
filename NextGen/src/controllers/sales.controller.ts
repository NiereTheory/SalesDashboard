import { Router, Request, Response } from 'express';
import { getManager, Between } from 'typeorm';
import { Sales } from '../entity/sales.entity';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const sales = await getManager().query(`
        SELECT s.amount, s.sale_date as saleDate, r.short_name as shortName, b.first_name as firstName, b.last_name as lastName
        FROM sales s
        INNER JOIN regions r
            ON s.fk_region = r.id
        INNER JOIN sellers b
            ON s.fk_seller = b.id
        WHERE s.sale_date between $1 and $2
        ORDER BY s.amount DESC
    `, [req.query.startDate, req.query.endDate]
    );

    res.send({ data: sales });
});

export { router as SalesController };