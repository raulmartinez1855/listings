/*
    REQUIREMENTS: 
        X Case Number for every result 
        X Flag for 'Foreclosure Sale Notice'
        X Property Address || Last Known Address
        X Defendant Name
*/
const rawData = require('./dailyScraper');
const address = /^(property)/;
const lastAddress = /^(last\sknown)/;
const versus = /^vs/;
const [month, day, year] = new Date().toLocaleDateString('en-US').split('/');

const fmtCurrentAddress = str => {
  const regexp = /property address:(.*?)fl(.*?)\d{5}/;
  return str.match(regexp) ? regexp.exec(str)[0].substring(18) : str;
};

const fmtData = async () => {
  const json = await rawData();
  const listings = await json.searchresults.result;

  const matches = await listings.map(obj => {
    const caseNumber = obj.CASENUMBER.split(' ')[0];
    const adBody = obj.ADBODY[0].split('<dd>');
    const defData = adBody.reduce(
      (acc, s, i) => {
        const str = s.toLowerCase();

        if (str.match(versus)) acc.name = adBody[i + 1];

        if (str.match(lastAddress)) {
          acc.address = str;
        }

        if (str.match(address)) {
          acc.address = fmtCurrentAddress(str);
        }

        return acc;
      },
      { name: 'N/A', address: 'N/A' }
    );

    return {
      caseNumber,
      dateCreated: `${month}/${day}/${year}`,
      ...defData,
      notice: obj.CLASSNAME
    };
  });

  return matches;
};

module.exports = fmtData;
