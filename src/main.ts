///<reference path="../typings/index.d.ts"/>

import * as csv from 'csv-parse';
import { createReadStream } from 'fs';
import { Transform } from 'stream';

import Student from "./student";

const fileStream = createReadStream('./data/student-mat.csv');
const parser = csv({columns: true, delimiter: ';'});

const students: Student[] = [];

fileStream.pipe(parser).on('data', (row: any) => {
    students.push(new Student(row));
});

console.log(students.join(' - '));
