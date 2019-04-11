import Axios from "axios";

const loadRegions = async (url) => {
    let regionIds = [];
    let regions = [
        { shortName: 'NAM', longName: 'North America' },
        { shortName: 'EMEA', longName: 'Europe Middle East' },
        { shortName: 'ASPAC', longName: 'Asia Pacific' },
        { shortName: 'LATAM', longName: 'Latin America' }
    ];

    for (let r of regions) {
        let res = await Axios.post(url, r);
        regionIds.push(res.data.data.id);
    }

    return Promise.resolve(regionIds);
}

export { loadRegions };
