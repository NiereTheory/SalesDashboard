import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Region } from '../entity/region.entity';
import { PagedResponse } from '../shared/paged.response';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const regionRepository = getManager().getRepository(Region);
    const regions = await regionRepository.find({ order: { shortName: 'ASC' } });
    res.send({ data: regions });
});

export { router as RegionController };
