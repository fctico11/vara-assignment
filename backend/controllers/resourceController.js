const csvtojson = require('csvtojson');
const ResourceConsumption = require('../models/ResourceConsumption');

const insertConsumptionData = async (filePath) => {
    try {
      const jsonArray = await csvtojson({
        noheader: true,
        output: "csv"
      }).fromFile(filePath);
  
      //skip the first row of headers
      const rows = jsonArray.slice(1);
  
      rows.forEach(async (row) => {
        const resourceType = row[0];
        const dataPoints = row.slice(1);
  
        //since headers are in the format "Month Year" - "Jan 2023", we want to slice
        const headers = jsonArray[0].slice(1);
  
        headers.forEach(async (header, index) => {
          const [month, year] = header.split(' ');
          const consumptionValue = parseFloat(dataPoints[index]) || 0;
  
          //create and save a new document for each month
          const newResourceConsumption = new ResourceConsumption({
            year: parseInt(year, 10),
            month: month,
            type: resourceType,
            consumption: consumptionValue
          });
  
          await newResourceConsumption.save();
        });
      });
  
      console.log('All data has been processed and saved to MongoDB.');
    } catch (error) {
      console.error('Error processing CSV data:', error);
      throw error;
    }
  };

  module.exports = {
    insertConsumptionData,
  };