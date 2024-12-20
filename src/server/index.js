import cors from 'cors';
import csv from 'csv-parser';
import express from 'express';
import { createReadStream } from 'fs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

// Arrays to hold the parsed CSV data
const themesMapping = [];

// Function to load and parse the CSV files
const loadCSVs = () => {
    // Load product_categories_to_themes_mapping.csv
    createReadStream('src/server/data/product_categories_to_themes_mapping.csv')
        .pipe(csv())
        .on('data', row => themesMapping.push(row))
        .on('end', () =>
            console.log('Themes Mapping CSV file successfully processed'),
        );
};

// Load the CSV data when the server starts
loadCSVs();

// GET endpoint to retrieve themes mapping
app.get('/api/themes', (req, res) => {
    res.json(themesMapping);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
