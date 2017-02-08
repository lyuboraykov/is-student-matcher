///<reference path="../typings/index.d.ts"/>

import * as csv from 'csv-parse';
import { createReadStream } from 'fs';
import { Transform } from 'stream';

import Student from './student';
import { getTestingAndTrainingStudents } from './lib/cross-validation';

const fileStream = createReadStream('./data/students.csv');
const parser = csv({columns: true, delimiter: ';'});

const students: Student[] = [];

fileStream.pipe(parser).on('data', (row: any) => {
    const student = new Student(row);
    students.push(student);
}).on('finish', () => {
    console.log(students[0].toPoint());
    for (let division of getTestingAndTrainingStudents(students)) {
        console.log(`Testing: ${division.testing.length}`);
        console.log(`Training: ${division.training.length}`);
    }
});
