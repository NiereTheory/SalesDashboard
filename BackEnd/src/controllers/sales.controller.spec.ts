import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/v1';

describe('Test the root path', () => {

    beforeAll(() => {
    });

    test('It tests the FY response object', async () => {
        let res = await axios.get(`${baseUrl}/sales?startDate=2018-01-01&endDate=2018-12-31`);
        expect(res.status).toEqual(200);
        expect(res.data.data.length).toEqual(100);
    });

    test('It tests GETting a single sale', async () => {
        let res = await axios.get(`${baseUrl}/sales/10`);
        expect(res.status).toEqual(200);
        expect(res.data.data.length).toEqual(1);
    });

    afterAll(() => {
    });

});
