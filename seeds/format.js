const rawData = require('./4-23-2019.json');
const json = JSON.parse(JSON.stringify(rawData));
const listings = json.searchresults.result;

const filtered = listings.filter(obj => {
    const bodyArr = obj.ADBODY[0].split('<dd>');
    const regex = /^(property)|^(last\sknown)/g;
    const address = bodyArr.find(v => v.toLowerCase().match(regex));
    return address;
});

const matches = filtered.map(obj => obj.ADBODY[0].split('<dd>'));

console.log(matches);
