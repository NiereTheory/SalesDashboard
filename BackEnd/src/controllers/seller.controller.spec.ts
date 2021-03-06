import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/v1';

describe('Test the root path', () => {

    beforeAll(() => {
    });

    test('It tests GETting all sellers', async () => {
        let res = await axios.get(`${baseUrl}/sellers`);
        expect(res.status).toEqual(200);
        expect(res.data.pagination.pageSize).toEqual(10);
        expect(res.data.data.length).toEqual(10);
        expect(res.data.pagination.lastPage).toEqual(2);
    });

    afterAll(() => {
    });

});
