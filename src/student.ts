export default class Student {
  [key: string]: any;
  private dataToProp: {[key: string]: string} = {
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
  // student's school (binary: 'GP' - Gabriel Pereira or 'MS' - Mousinho da Silveira)
  public school: string;
  // student's sex (binary: 'F' - female or 'M' - male)
  public sex: string;
  // student's age (numeric: from 15 to 22)
  public age: number;
  // student's home address type (binary: 'U' - urban or 'R' - rural)
  public address: string;
  // family size (binary: 'LE3' - less or equal to 3 or 'GT3' - greater than 3)
  public familySize: string;
  // parent's cohabitation status (binary: 'T' - living together or 'A' - apart)
  public parentalStatus: string;
  // mother's education (numeric: 0 - none,
  //  1 - primary education (4th grade), 2 â€“ 5th to 9th grade,
  //  3 â€“ secondary education or 4 â€“ higher education)
  public motherEducation: number;
  //  father's education (numeric: 0 - none,
  // 1 - primary education (4th grade), 2 â€“ 5th to 9th grade,
  // 3 â€“ secondary education or 4 â€“ higher education)
  public fatherEducation: number;
  // mother's job (nominal: 'teacher', 'health' care related, civil 'services' (e.g. administrative or police), 'at_home' or 'other')
  public motherJob: string;
  // Fjob - father's job (nominal: 'teacher', 'health' care related, civil 'services' (e.g. administrative or police), 'at_home' or 'other')
  public fatherJob: string;
  // reason - reason to choose this school (nominal: close to 'home', school 'reputation', 'course' preference or 'other')
  public reason: string;
  // guardian - student's guardian (nominal: 'mother', 'father' or 'other')
  public guardian: string;
  // traveltime - home to school travel time (numeric: 1 - <15 min., 2 - 15 to 30 min., 3 - 30 min. to 1 hour, or 4 - >1 hour)
  public traveltime: number;
  // studytime - weekly study time (numeric: 1 - <2 hours, 2 - 2 to 5 hours, 3 - 5 to 10 hours, or 4 - >10 hours)
  public studytime: string;
  // failures - number of past class failures (numeric: n if 1<=n<3, else 4)
  public failures: number;
  // schoolsup - extra educational support (binary: yes or no)
  public schoolSupport: string;
  // famsup - family educational support (binary: yes or no)
  public familySupport: string;
  // paid - extra paid classes within the course subject (Math or Portuguese) (binary: yes or no)
  public paid: string;
  // activities - extra-curricular activities (binary: yes or no)
  public activities: string;
  // nursery - attended nursery school (binary: yes or no)
  public nursery: string;
  // higher - wants to take higher education (binary: yes or no)
  public higher: string;
  // internet - Internet access at home (binary: yes or no)
  public internet: string;
  // romantic - with a romantic relationship (binary: yes or no)
  public romantic: string;
  // famrel - quality of family relationships (numeric: from 1 - very bad to 5 - excellent)
  public familyRelationship: number;
  // freetime - free time after school (numeric: from 1 - very low to 5 - very high)
  public freetime: number;
  // goout - going out with friends (numeric: from 1 - very low to 5 - very high)
  public goout: number;
  // Dalc - workday alcohol consumption (numeric: from 1 - very low to 5 - very high)
  public dailyAlcohol: number;
  // Walc - weekend alcohol consumption (numeric: from 1 - very low to 5 - very high)
  public weeklyAlcohol: number;
  // health - current health status (numeric: from 1 - very bad to 5 - very good)
  public health: number;
  // absences - number of school absences (numeric: from 0 to 93)
  public absence: number;

  public constructor(csvEntry: {[key: string]: string}) {
    for (let key in csvEntry) {
      if (key in this.dataToProp) {
        this[this.dataToProp[key]] = this.parseValue(csvEntry[key]);
      }
    }
  }

  private parseValue(val: string): any {
    let parsedValue: any;
    parsedValue = parseInt(val);
    if (parsedValue === NaN) {
      parsedValue = val;
    }
    return parsedValue;
  }
}

