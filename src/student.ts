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

  public csvProps: [StudentField] = [
    this.school, this.sex, this.age, this.address, this.familySize, this.parentalStatus,
    this.motherEducation, this.fatherEducation, this.motherJob, this.fatherJob,
    this.reason, this.guardian, this.traveltime, this.studytime, this.failures,
    this.schoolSupport, this.familySupport, this.paid, this.activities, this.nursery,
    this.higher, this.internet, this.romantic, this.familyRelationship, this.freetime,
    this.goout, this.dailyAlcohol, this.weeklyAlcohol, this.health, this.absences
  ]

  public constructor(csvEntry: {[key: string]: string}) {
    for (const key in csvEntry) {
      for (const prop of this.csvProps) {
        if (prop.csvKey === key) {
          prop.value = prop.toValue(csvEntry[key]);
        }
      }
    }
  }

  public toPoint(): number[] {
    return this.csvProps.map(csvProp => {
      return csvProp.value;
    });
  }
}

