import * as fs from 'fs';
import path from 'path';

// const CSVToJSON = (data: string, delimiter = ',') => {
//     const titles = data.slice(0, data.indexOf('\n')).split(delimiter);

//     return data
//         .slice(data.indexOf('\n') + 1)
//         .split('\n')
//         .map((v) => {
//             const values = v.split(delimiter);
//             return titles.reduce(
//                 (obj: Record<string, string>, title, index) => {
//                     obj[title.trim()] = values[index]?.trim() ?? '';
//                     return obj;
//                 },
//                 {}
//             );
//         });
// };

type CsvRow = Record<string, string>;

function parseCsvToJson(csvData: string, delimiter: string = ','): CsvRow[] {
  // Split CSV into lines. ref:https://chatgpt.com/s/t_697761023d348191b8551f1b66185a24
  const lines = csvData.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  // Extract header row (column names)
  const headers = lines[0].split(delimiter).map(h => h.trim());

  // Process data rows
  return lines.slice(1).map((line) => {     // lines.slice(1): Skips the header row. Takes only data rows
    const values = line.split(delimiter);

    const row: CsvRow = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() ?? '';
      /***
       * Step by step:
         values[index] → get corresponding column value
         ?.trim() → safely remove spaces (avoids crash if value is missing)
         ?? '' → fallback to empty string if value is undefined
       */
    });

    return row;
  });
}




const currentDir = __dirname;
const srcDir = path.resolve(currentDir, '..');
const testdataDir = path.resolve(srcDir, 'testdata');

export const convertCsvFileToJsonFile = (csvFileName: string, jsonFileName: string, delimiter = ',') => {
    try {
        // Construct full file paths
        const csvPath = path.join(testdataDir, csvFileName);
        const jsonPath = path.join(testdataDir, jsonFileName);

        // Read the CSV file
        const csvData = fs.readFileSync(csvPath, 'utf8');

        // Convert CSV to JSON
        const jsonData = parseCsvToJson(csvData, delimiter);

        // Write JSON data to a new file
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

        console.log(`Conversion completed. JSON data written to: ${jsonPath}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error converting CSV to JSON:', error.message);
        } else {
            console.error('Error converting CSV to JSON:', error);
        }
    }
};