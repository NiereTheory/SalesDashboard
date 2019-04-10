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

router.post('/', async (req: Request, res: Response) => {
    const newRegion = req.body;
    const regionRepository = getManager().getRepository(Region);
    const region = await regionRepository.save(newRegion);
    res.status(201).send({ data: region });
});

router.delete('/:id', async (req: Request, res: Response) => {
    const regionID = req.params.id;
    const regionRepository = getManager().getRepository(Region);
    await regionRepository.delete(regionID);
    res.status(204).send();
});

export { router as RegionController };
