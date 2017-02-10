export enum School {
  GP, MS
}

export enum Sex {
  F, M
}

export enum Address {
  U, R
}

export enum FamilySize {
  LE3, GT3
}

export enum ParentalStatus {
  T, A
}

export enum ParentJob {
  TEACHER, HEALTH, SERVICES, AT_HOME, OTHER
}

export enum SchoolReason {
  HOME, REPUTATION, COURSE, OTHER
}

export enum Guardian {
  MOTHER, FATHER, OTHER
}

export class StudentField {
  public constructor(csvKey: string, toValue: (csvVal: string, type?: string) => number) {
    this.csvKey = csvKey;
    this.toValue = toValue;
  }

  public value: number;
  public csvKey: string;
  public toValue: (csvVal: string) => number;

  public static booleanToValue(csvVal: string): number {
    return +(csvVal === 'yes');
  }

  public static numericToValue(csvVal: string): number {
    return parseInt(csvVal);
  }

  public static enumToValue(type: string): (csvVal: string) => number {
    // don't look here
    const enumm = eval(type);
    return (csvVal: string): number => {
      for (const type in enumm) {
        if (csvVal.toUpperCase() === type) {
          return parseInt(enumm[type]);
        }
      }
    };
  }
}

export class SpecialField {
  public constructor(csvKey: string, toValue: (csvVal: string) => number[]) {
    this.csvKey = csvKey;
    this.toValue = toValue;
  }

  public csvKey: string;
  public toValue: (csvVal: string) => number[];
  public value: number[] = [];

  public static arrToVal(csvVal: string): number[] {
    return csvVal.split(',').map(num => parseInt(num));
  }
}

export default class Student {
  public school = new StudentField('school', StudentField.enumToValue('School'));
  public sex = new StudentField('sex', StudentField.enumToValue('Sex'));
  public age = new StudentField('age', StudentField.numericToValue);
  public address = new StudentField('address', StudentField.enumToValue('Address'));
  public familySize = new StudentField('famsize', StudentField.enumToValue('FamilySize'));
  public parentalStatus = new StudentField('Pstatus', StudentField.enumToValue('ParentalStatus'));
  public motherEducation = new StudentField('Medu', StudentField.numericToValue);
  public fatherEducation = new StudentField('Fedu', StudentField.numericToValue);
  public motherJob = new StudentField('Mjob', StudentField.enumToValue('ParentJob'));
  public fatherJob = new StudentField('Fjob', StudentField.enumToValue('ParentJob'));
  public reason = new StudentField('reason', StudentField.enumToValue('SchoolReason'));
  public guardian = new StudentField('guardian', StudentField.enumToValue('Guardian'));
  public traveltime = new StudentField('traveltime', StudentField.numericToValue);
  public studytime = new StudentField('studytime', StudentField.numericToValue);
  public failures = new StudentField('failures', StudentField.numericToValue);
  public schoolSupport = new StudentField('schoolsup', StudentField.booleanToValue);
  public familySupport = new StudentField('famsup', StudentField.booleanToValue);
  public paid = new StudentField('paid', StudentField.booleanToValue);
  public activities = new StudentField('activities', StudentField.booleanToValue);
  public nursery = new StudentField('nursery', StudentField.booleanToValue);
  public higher = new StudentField('higher', StudentField.booleanToValue);
  public internet = new StudentField('internet', StudentField.booleanToValue);
  public romantic = new StudentField('romantic', StudentField.booleanToValue);
  public familyRelationship = new StudentField('famrel', StudentField.numericToValue);
  public freetime = new StudentField('freetime', StudentField.numericToValue);
  public goout = new StudentField('goout', StudentField.numericToValue);
  public dailyAlcohol = new StudentField('Dalc', StudentField.numericToValue);
  public weeklyAlcohol = new StudentField('Walc', StudentField.numericToValue);
  public health = new StudentField('health', StudentField.numericToValue);
  public absences = new StudentField('absences', StudentField.numericToValue);
  public preferences = new SpecialField('preferences', SpecialField.arrToVal);
  public closeFriend = new StudentField('close_friends', StudentField.numericToValue);
  // those who have offered you
  public proposals: number[] = [];
  // those who you have offered
  public propositions: number[] = [];
  public matched: number = -1;
  public rejected: number[] = [];

  public isMatched(): boolean {
    return this.matched !== -1;
  }

  public hasRejected(i: number): boolean {
    return this.rejected.indexOf(i) !== -1;
  }

  public proposeTo(student: Student, myI: number, otherI: number): void {
    this.propositions.push(otherI);
    student.proposals.push(myI);
  }

  public accept(student: Student, myI: number, otherI: number): void {
    student.matched = myI;
    this.matched = otherI;
  }

  public reject(student: Student, myI: number, otherI: number): void {
    if (this.matched == otherI) {
      this.matched = -1;
    }
    this.proposals = this.proposals.filter(el => el !== otherI);
    this.rejected.push(otherI);
    student.rejected.push(myI);
    if (student.matched === myI) {
      student.matched = -1;
    }
    student.propositions = student.propositions.filter(el => el !== myI);
    student.preferences.value = student.preferences.value.filter(el => el !== myI);
  }

  public hasBeenProposed(): boolean {
    return this.proposals.length > 0;
  }

  public prefersOver(i: number, j: number): boolean {
    return this.preferences.value.indexOf(i) < this.preferences.value.indexOf(j);
  }

  public rejectLowerThanMatched(students: Student[], myI: number): void {
    const matchedPrefI = this.preferences.value.indexOf(this.matched);
    for (let i = matchedPrefI + 1; i < this.preferences.value.length; i++) {
      const otherI = this.preferences.value[i];
      this.reject(students[otherI], myI, otherI);
      students[otherI].reject(this, otherI, myI);
    }
  }

  public pointProps: [StudentField] = [
    this.school, this.sex, this.age, this.address, this.familySize, this.parentalStatus,
    this.motherEducation, this.fatherEducation, this.motherJob, this.fatherJob,
    this.reason, this.guardian, this.traveltime, this.studytime, this.failures,
    this.schoolSupport, this.familySupport, this.paid, this.activities, this.nursery,
    this.higher, this.internet, this.romantic, this.familyRelationship, this.freetime,
    this.goout, this.dailyAlcohol, this.weeklyAlcohol, this.health, this.absences
  ]

  public otherProps: [SpecialField | StudentField] = [
    this.preferences, this.closeFriend
  ]

  public constructor(csvEntry: {[key: string]: string}) {
    for (const key in csvEntry) {
      for (const prop of this.pointProps) {
        if (prop.csvKey === key) {
          prop.value = prop.toValue(csvEntry[key]);
        }
      }
      for (const prop of this.otherProps) {
        if (prop.csvKey === key) {
          prop.value = prop.toValue(csvEntry[key]);
        }
      }
    }
  }

  public toPoint(): number[] {
    return this.pointProps.map(csvProp => {
      return csvProp.value;
    });
  }
}

