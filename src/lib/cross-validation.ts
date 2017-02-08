import Student from '../student';

const TESTING_PERCENTAGE = 20;
const FULL_PERCENTAGE = 100;

/**
 * An iterator for testing and training partners
 *
 * @export
 * @param {Student[]} students
 * @returns {IterableIterator<{testing: Student[], training: Student[]}>}
 */
export function* getTestingAndTrainingStudents(students: Student[]):
        IterableIterator<{testing: Student[], training: Student[]}> {
    let offsetPercentage = 0;
    while(offsetPercentage < FULL_PERCENTAGE - TESTING_PERCENTAGE) {
        let startIndex = (offsetPercentage / FULL_PERCENTAGE) * students.length;
        let endIndex = ((offsetPercentage + TESTING_PERCENTAGE) / FULL_PERCENTAGE) * students.length;
        let testingStudents = students.slice(startIndex, endIndex);
        let trainingStudents = students.slice(0, startIndex)
                                       .concat(students.slice(endIndex));
        offsetPercentage += TESTING_PERCENTAGE;
        yield {testing: testingStudents, training: trainingStudents};
    }
}
