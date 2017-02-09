///<reference path="../typings/index.d.ts"/>

import * as csv from 'csv-parse';
import { createReadStream } from 'fs';
import { Transform } from 'stream';

import Student from './student';
import { getTestingAndTrainingStudents } from './lib/cross-validation';

import { kMeans, distributeClusters } from './core/k-means';
import { stableRoommates }  from './core/irving';

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
    const distributedClusters = distributeClusters(clusters, 3);
    // stableRoommates(students.filter(st => st.preferences.value.length > 100));
    console.log(students);
  }
});
