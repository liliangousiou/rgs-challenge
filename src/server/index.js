import cors from 'cors';
import csv from 'csv-parser';
import express from 'express';
import { createReadStream } from 'fs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

// Arrays to hold the parsed CSV data
const revenues = [];
const themesMapping = [];
const descriptionsMapping = [];
const sectorMapping = [];

// Function to load and parse the CSV files
const loadCSVs = () => {
  // Load product_category_level_revenues.csv
  createReadStream('./data/product_category_level_revenues.csv')
    .pipe(csv())
    .on('data', row => revenues.push(row))
    .on('end', () => console.log('Revenue CSV file successfully processed'));

  // Load product_categories_to_themes_mapping.csv
  createReadStream('./data/product_categories_to_themes_mapping.csv')
    .pipe(csv())
    .on('data', row => themesMapping.push(row))
    .on('end', () =>
      console.log('Themes Mapping CSV file successfully processed'),
    );

  // Load product_categories_to_description_mapping.csv
  createReadStream(
    './data/product_categories_to_description_mapping.csv',
  )
    .pipe(csv())
    .on('data', row => descriptionsMapping.push(row))
    .on('end', () =>
      console.log('Descriptions Mapping CSV file successfully processed'),
    );

  // Load company_to_sector_country_industry_mapping.csv
  createReadStream(
    './data/company_to_sector_country_industry_mapping.csv',
  )
    .pipe(csv())
    .on('data', row => sectorMapping.push(row))
    .on('end', () =>
      console.log('Sector Mapping CSV file successfully processed'),
    );
};

// Load the CSV data when the server starts
loadCSVs();

// GET endpoint to retrieve all revenue data
app.get('/api/revenues', (req, res) => {
  res.json(revenues);
});

// GET endpoint to retrieve themes mapping
app.get('/api/themes', (req, res) => {
  res.json(themesMapping);
});

// GET endpoint to retrieve descriptions mapping
app.get('/api/descriptions', (req, res) => {
  res.json(descriptionsMapping);
});

// GET endpoint to retrieve sector mapping
app.get('/api/sector', (req, res) => {
  res.json(sectorMapping);
});

// GET endpoint to filter revenues by theme
app.get('/api/revenues/theme/:theme', (req, res) => {
  const theme = req.params.theme;
  const filteredRevenues = revenues.filter(revenue => {
    const matchingTheme = themesMapping.find(
      mapping =>
        mapping['RGS Product Category'] === revenue['RGS Product Category'],
    );
    return matchingTheme && matchingTheme[theme] === 'TRUE';
  });
  res.json(filteredRevenues);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
