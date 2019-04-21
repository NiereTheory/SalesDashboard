import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/v1';

describe('Test the root path', () => {

    beforeAll(() => {
    });

    test('It tests GETting all regions', async () => {
        let res = await axios.get(`${baseUrl}/regions`);
        expect(res.status).toEqual(200);
        expect(res.data.data.length).toEqual(4);
    });

    afterAll(() => {
    });

});
