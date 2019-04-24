/*
    REQUIREMENTS: 
        - Case Number for every result
        - Flag for 'Foreclosure Sale Notice'
        - Property Address || Last Known Address
        - Defendant Name
*/

const rawData = require('./4-23-2019.json');
const json = JSON.parse(JSON.stringify(rawData));
const listings = json.searchresults.result;
const regex = /^(property)|^(last\sknown)/;
const address = /^(property)/;
const lastAddress = /^(last\sknown)/;
const versus = /^vs/;

const filtered = listings.filter(obj => {
  const adBody = obj.ADBODY[0].split('<dd>');
  const address = adBody.find(v => v.toLowerCase().match(regex));
  return address;
});

const matches = filtered.map(obj => {
  const adBody = obj.ADBODY[0].split('<dd>');
  return adBody.reduce(
    (acc, s, i) => {
      const str = s.toLowerCase();

      if (str.match(versus)) {
        acc.name = adBody[i + 1];
      }

      if (str.match(address)) {
        const regexp = /property address:(.*?)fl(.*?)\d{5}/;

        acc.address = str.match(regexp)
          ? regexp.exec(str)[0].substring(18)
          : str;
      }

      if (str.match(lastAddress)) {
        console.log(str);
      }

      return acc;
    },
    { name: 'N/A' }
  );
});

const saleNotices = listings
  .filter(v => v.CLASSNAME === 'FCL Ntc Sale FL')
  .map(v => v.ADBODY[0].split('<dd>'));

// const sttr =
//   '';

// console.log(sttr.match('property address:(.*?)any')[1]);
