const { expect } = require('chai');
const csvtoJSON = require('../dataCSVtoJSON').CVStoJSON;


describe('dataCSVtoJSON TEST', function () {
  const options = {
    delimiter: ',', // optional
    quote: '"' // optional
  };

  it('should take data in CSV format and convert it to JSON', function () {

    let expected = (csvtoJSON('./spec/test.csv', options));
    let result = [{
      'album': 'The White Stripes',
      'year': '1999',
      'US_peak_chart_post': '-'
    },
    {
      'album': 'De Stijl',
      'year': '2000',
      'US_peak_chart_post': '-'
    },
    {
      'album': 'White Blood Cells',
      'year': '2001',
      'US_peak_chart_post': '61'
    },
    {
      'album': 'Elephant',
      'year': '2003',
      'US_peak_chart_post': '6'
    },
    {
      'album': 'Get Behind Me Satan',
      'year': '2005',
      'US_peak_chart_post': '3'
    },
    {
      'album': 'Icky Thump',
      'year': '2007',
      'US_peak_chart_post': '2'
    },
    {
      'album': 'Under Great White Northern Lights',
      'year': '2010',
      'US_peak_chart_post': '11'
    },
    {
      'album': 'Live in Mississippi',
      'year': '2011',
      'US_peak_chart_post': '-'
    },
    {
      'album': 'Live at the Gold Dollar',
      'year': '2012',
      'US_peak_chart_post': '-'
    },
    {
      'album': 'Nine Miles from the White City',
      'year': '2013',
      'US_peak_chart_post': '-'
    }
    ];

    expect(expected).to.eql(result);

  });

});