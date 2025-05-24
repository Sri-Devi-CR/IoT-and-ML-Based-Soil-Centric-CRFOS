import fs from "fs";
import csv from "csv-parser"
import SoilData from "../models/dataset/dataset.js" // Import the Mongoose model

// Function to process the CSV file and insert data into MongoDB
export function importCSVToMongoDB(filePath) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data)) // Collect rows from the CSV
    .on('end', async () => {
      console.log('CSV file successfully processed.');

      try {
        // Insert all rows into the MongoDB collection
        await SoilData.insertMany(results);
        console.log('Data successfully inserted into MongoDB.');
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
      }
    });
}

// Call the function with the path to your CSV file
importCSVToMongoDB('./db/crop-recommendation-ds.csv');