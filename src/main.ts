///<reference path="../typings/index.d.ts"/>

import * as csv from 'csv-parse';
import { createReadStream } from 'fs';
import { Transform } from 'stream';

import Student from './student';
import { getTestingAndTrainingStudents } from './lib/cross-validation';

import { kMeans, distributeClusters } from './core/k-means';
import { stableRoommates }  from './core/irving';

const fileStream = createReadStream('./data/students-preferences-friends.csv');
const parser = csv({columns: true, delimiter: ';'});

const students: Student[] = [];

fileStream.pipe(parser).on('data', (row: any) => {
  const student = new Student(row);
  students.push(student);
}).on('finish', () => {
  const clusters = kMeans(students.map(st => st.toPoint()),
                          students.length / 3);
  const distributedClusters = distributeClusters(clusters, 2);
  // stableRoommates(students.filter(st => st.preferences.value.length > 100));
  let matchedCount = 0;
  distributedClusters.forEach(cluster => {
    if (cluster.length === 2) {
      const firstStudent = students[cluster[0]];
      const secondStudent = students[cluster[1]];
      if (firstStudent.closeFriend.value === cluster[1] ||
          secondStudent.closeFriend.value === cluster[0]) {
        matchedCount += 1;
      }
    }
  });

  console.log(`${(matchedCount / students.length) * 100}% match`);
});
