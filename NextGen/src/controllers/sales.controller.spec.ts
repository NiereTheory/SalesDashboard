import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/v1';

describe('Test the root path', () => {

    beforeAll(() => {
    });

    test('It should confirm a status of 200 for a GET response', async () => {
        let res = await axios.get(`${baseUrl}/sales?startDate=2018-01-01&endDate=2018-01-31`);
        expect(res.status).toEqual(200);
    });

    test('It should response the GET method', async () => {
        let res = await axios.get(`${baseUrl}/sales?startDate=2018-01-01&endDate=2018-12-31`);
        expect(res.data.data.length).toEqual(1000);
    });

    afterAll(() => {
    });

});
