import { loadSellers } from './LoadSellers';
import { loadRegions } from './LoadRegions';
import { loadSales } from './LoadSales';

let baseUrl = `http://localhost:3000/api/v1`;

let loadDB = async () => {
    console.log('Seed starting');
    let sellerIds = await loadSellers(20, `${baseUrl}/sellers`);
    let regionIds = await loadRegions(`${baseUrl}/regions`);
    let status = await loadSales(100, `${baseUrl}/sales`, regionIds, sellerIds);
    console.log(status);
}

export { loadDB };