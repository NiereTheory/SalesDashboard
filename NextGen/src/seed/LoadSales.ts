import Axios from "axios";

const loadSales = async (maxIterations, url, regionIds, sellerIds) => {
    for (let i = 0; i <= maxIterations; i++) {
        let sale = {
            amount: (Math.random() * 1000 + 1).toFixed(2),
            saleDate: `2018-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
            region: regionIds[Math.floor(Math.random() * regionIds.length)],
            seller: sellerIds[Math.floor(Math.random() * sellerIds.length)]
        };

        await Axios.post(url, sale);
    }

    return Promise.resolve('Completed');
}

export { loadSales };
