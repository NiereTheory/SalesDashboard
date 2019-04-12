import * as faker from 'faker';
import Axios from 'axios';

const loadSellers = async (maxIterations, url) => {
    let sellerIds = [];

    for (let i = 0; i < maxIterations; i++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let hireDate = `2017-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
        let seller = { firstName, lastName, hireDate };

        let res = await Axios.post(url, seller);
        sellerIds.push(res.data.data.id);
    }

    return Promise.resolve(sellerIds);
}

export { loadSellers };
