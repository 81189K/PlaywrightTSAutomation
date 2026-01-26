import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import * as createCsvWriter from "csv-writer";



// Define the type for recruitment data
export interface RecruitmentData {
    firstname: string;
    lastname: string;
    vacancy: string;
    email: string;
    contactNo?: string;
}

const DESIGNATIONS = [
    // "Software Engineer",
    "Junior Account Assistant",
    // "Payroll Administrator",
    "Senior QA Lead"
];

// Function to generate fake recruitment data
const generateRecruitmentData = (): RecruitmentData => {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        vacancy: faker.helpers.arrayElement(DESIGNATIONS),
        email: faker.internet.email(),
        // contactNo: faker.phone.number(),
        contactNo: faker.string.numeric(10)
    };
};

// Function to generate an array of fake recruitment data
export const generateRecruitmentDataArray = (noOfRecords: number): RecruitmentData[] => {
    const dataArray: RecruitmentData[] = faker.helpers.multiple(generateRecruitmentData, { count: noOfRecords });
    return dataArray;
};

const currentDir = path.resolve(__dirname);
// Go one level up to src/
const srcDir = path.resolve(currentDir, '../');
// Define testdata directory path
const testdataDir = path.join(srcDir, 'testdata');

// Function to export recruitment data to JSON file
export const exportRecruitmentDataToJsonFile = (dataArray: RecruitmentData[], fileName: string): void => {
    const jsonFilePath = path.join(testdataDir, fileName);
    fs.writeFileSync(jsonFilePath, JSON.stringify(dataArray, null, 2), 'utf8');
    console.log(`Generated JSON file at: ${jsonFilePath}`);
};

// Function to export recruitment data to CSV file
export const exportRecruitmentDataToCsvFile = async (dataArray: RecruitmentData[], fileName: string) => {
    const csvFilePath = path.join(testdataDir, fileName);
    const csvWriter = createCsvWriter.createObjectCsvWriter({
        path: csvFilePath,
        header: [
            { id: 'firstname', title: 'firstname' },
            { id: 'lastname', title: 'lastname' },
            { id: 'vacancy', title: 'vacancy' },
            { id: 'email', title: 'email' },
            { id: 'contactNo', title: 'contactNo' },
        ],
    });
    await csvWriter.writeRecords(dataArray);
    console.log(`Generated CSV file at: ${csvFilePath}`);
};