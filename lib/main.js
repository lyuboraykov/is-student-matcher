"use strict";
var csv = require("csv-parse");
var fs_1 = require("fs");
var student_1 = require("./student");
var fileStream = fs_1.createReadStream('./data/student-mat.csv');
var parser = csv({ columns: true, delimiter: ';' });
var students = [];
fileStream.pipe(parser).on('data', function (row) {
    students.push(new student_1["default"](row));
});
console.log(students.join(' - '));
