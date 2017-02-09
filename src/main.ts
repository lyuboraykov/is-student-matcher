///<reference path="../typings/index.d.ts"/>

import * as csv from 'csv-parse';
import { createReadStream } from 'fs';
import { Transform } from 'stream';

import Student from './student';
import { getTestingAndTrainingStudents } from './lib/cross-validation';

import {kMeans} from './core/k-means';

const fileStream = createReadStream('./data/students-preferences.csv');
const parser = csv({columns: true, delimiter: ';'});

const students: Student[] = [];

fileStream.pipe(parser).on('data', (row: any) => {
  const student = new Student(row);
  students.push(student);
}).on('finish', () => {
  for (let division of getTestingAndTrainingStudents(students)) {
    const clusters = kMeans(division.training.map(student => student.toPoint()),
                            division.training.length / 3);
    console.log(clusters);
  }
});
