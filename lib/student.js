"use strict";
var Student = (function () {
    function Student(csvEntry) {
        this.dataToProp = {
            famsize: 'familySize',
            Pstatus: 'parentalStatus',
            Medu: 'motherEducation',
            Fedu: 'fatherEducation',
            Mjob: 'motherJob',
            Fjob: 'fatherJob',
            schoolsup: 'schoolSupport',
            famsup: 'familySupport',
            Dalc: 'dailyAlcohol',
            Walc: 'weeklyAlcohol'
        };
        for (var key in csvEntry) {
            if (key in this.dataToProp) {
                this[this.dataToProp[key]] = this.parseValue(csvEntry[key]);
            }
            else if (key in this) {
                this[key] = csvEntry[key];
            }
        }
    }
    Student.prototype.parseValue = function (val) {
        var parsedValue;
        parsedValue = parseInt(val);
        if (parsedValue === NaN) {
            parsedValue = val;
        }
        return parsedValue;
    };
    return Student;
}());
exports.__esModule = true;
exports["default"] = Student;
