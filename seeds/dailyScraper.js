const rp = require('request-promise');

const [month, day, year] = new Date().toLocaleDateString('en-US').split('/');
const [startNum, endNum] = [1, 100];
const link = `https://data.alm.com/ALMServices/searchMLPNNew.htm?queryString=atex-paper:MIA%20(atex-class:ForeclosureNoticesDBR)&startYear=${year}&startMonth=${month}&startDay=${day}&stopYear=${year}&stopMonth=${month}&stopDay=${day}&sortField=publicnotices&sortOrder=descending&start=${startNum}&end=${endNum}&returnType=json`;
const options = { uri: link, json: true };

module.exports = async () => await rp(options);
