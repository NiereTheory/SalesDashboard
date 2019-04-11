import { loadSellers } from './LoadSellers';
import { loadRegions } from './LoadRegions';
import { loadSales } from './LoadSales';

let baseUrl = `http://localhost:3000/api/v1`;

let loadDB = async () => {
    console.log('Seed starting');
    let sellerIds = await loadSellers(Math.floor(Math.random() * 10) + 1, `${baseUrl}/sellers`);
    let regionIds = await loadRegions(`${baseUrl}/regions`);
    let status = await loadSales(Math.floor(Math.random() * 1000) + 1, `${baseUrl}/sales`, regionIds, sellerIds);
    console.log(status);
}

export { loadDB };