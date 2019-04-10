import { Router, Request, Response } from 'express';
import { getManager, Between } from 'typeorm';

import { Sale } from '../entity/sales.entity';
import { SaleOutDTO } from '../entity/sale.outdto';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const saleRepository = await getManager().getRepository(Sale);

    const fullSales = await saleRepository.find({
        relations: ['seller', 'region'],
        where: { saleDate: Between(req.query.startDate, req.query.endDate) }
    });

    if (req.query.format === 'slim') {
        let sales: SaleOutDTO[] = [];
        while (fullSales.length) {
            let tempSale = fullSales.pop();
            sales.push(new SaleOutDTO(
                Number(tempSale.amount),
                tempSale.saleDate,
                tempSale['region']['shortName'],
                tempSale['seller']['firstName'],
                tempSale['seller']['lastName']
            ));
        }
        res.send({ data: sales })
    }
    else {
        res.send({ data: fullSales });
    }

});

router.post('/', async (req: Request, res: Response) => {
    const newSale = req.body;
    const regionRepository = getManager().getRepository(Sale);
    const sale = await regionRepository.save(newSale);
    res.status(201).send({ data: sale });
});

router.delete('/:id', async (req: Request, res: Response) => {
    const saleID = req.params.id;
    const saleRepository = getManager().getRepository(Sale);
    await saleRepository.delete(saleID);
    res.status(204).send();
});

export { router as SalesController };

// router.get('/', async (req: Request, res: Response) => {
//     let sales = await getManager().query(`
//         SELECT s.amount, s.sale_date as saleDate, r.short_name as region, b.first_name as firstName, b.last_name as lastName
//         FROM sales s
//         INNER JOIN regions r
//             ON s.fk_region = r.id
//         INNER JOIN sellers b
//             ON s.fk_seller = b.id
//         WHERE s.sale_date between $1 and $2
//         ORDER BY s.amount DESC
//     `, [req.query.startDate || '2019-04-01', req.query.endDate || '2019-04-30']
//     );
//     let salesDTO: SaleOutDTO[] = [];
//     sales.forEach(s => {
//         salesDTO.push(new SaleOutDTO(Number(s.amount), s.saledate, s.region, s.firstname, s.lastname));
//     });
//     res.send({ data: salesDTO });
// });
