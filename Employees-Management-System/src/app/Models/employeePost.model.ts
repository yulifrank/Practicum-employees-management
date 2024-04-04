export class EmployeePostModel {
  firstName: string;
  lastName: string;
  identity: string;
  gender: Gender = Gender.Male; // ערך דיפולטיבי
  birthdate: string;
  employmentStartDate: string;

  constructor(
    firstName: string,
    lastName: string,
    identity: string,
    birthdate: string,
    employmentStartDate: string,
    gender: Gender = Gender.Male // ערך דיפולטיבי
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.identity = identity;
    this.birthdate = birthdate;
    this.employmentStartDate = employmentStartDate;
    this.gender = gender;
  }
}

  
  export enum Gender {
    Male = 0,
    Female = 1
  }
  