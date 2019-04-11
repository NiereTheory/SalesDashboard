import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Seller } from '../entity/seller.entity';
import { PagedResponse } from '../entity/paged.response';

const router: Router = Router();

const pageSize = 10;

router.get('/', async (req: Request, res: Response) => {
    const sellerRepository = getManager().getRepository(Seller);

    const currPage: number = Number(req.query.page) || 1;
    const maxItems: number = await sellerRepository.count({ cache: true });
    const lastPage: number = Math.ceil(Number(maxItems) / pageSize);

    const sellers = await sellerRepository.find(
        {
            order: { lastName: 'ASC', firstName: 'ASC' },
            take: pageSize,
            skip: pageSize * (currPage - 1)
        }
    );

    const returnPage: PagedResponse<Seller> =
    {
        data: sellers,
        pagination: {
            firstPage: 1,
            currPage,
            lastPage,
            pageSize
        }
    };

    res.send(returnPage);
});

router.get('/:id', async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const sellerRepository = getManager().getRepository(Seller);
    const seller = await sellerRepository.find(
        {
            where: { id }
        }
    );
    res.send({ data: seller });
});

router.post('/', async (req: Request, res: Response) => {
    const newSeller = req.body;
    const sellerRepository = getManager().getRepository(Seller);
    const seller = await sellerRepository.save(newSeller);
    res.status(201).send({ data: seller });
});

router.put('/:id', async (req: Request, res: Response) => {
    const sellerID = req.params.id;
    const newSeller = req.body;
    const sellerRepository = getManager().getRepository(Seller);
    await sellerRepository.update(sellerID, newSeller);
    res.status(204).send();
});

router.delete('/:id', async (req: Request, res: Response) => {
    const sellerID = req.params.id;
    const sellerRepository = getManager().getRepository(Seller);
    await sellerRepository.delete(sellerID);
    res.status(204).send();
});

export { router as SellerController };
