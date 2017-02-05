export default class Student {
    [key: string]: any;
    private dataToProp;
    school: string;
    sex: string;
    age: number;
    address: string;
    familySize: string;
    parentalStatus: string;
    motherEducation: number;
    fatherEducation: number;
    motherJob: string;
    fatherJob: string;
    reason: string;
    guardian: string;
    traveltime: number;
    studytime: string;
    failures: number;
    schoolSupport: string;
    familySupport: string;
    paid: string;
    activities: string;
    nursery: string;
    higher: string;
    internet: string;
    romantic: string;
    familyRelationship: number;
    freetime: number;
    goout: number;
    dailyAlcohol: number;
    weeklyAlcohol: number;
    health: number;
    absence: number;
    constructor(csvEntry: {
        [key: string]: string;
    });
    private parseValue(val);
}
