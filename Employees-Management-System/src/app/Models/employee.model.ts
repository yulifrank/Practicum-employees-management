export interface Employee {
    code: number;
    firstName: string;
    lastName: string;
    identity: string;
    gender: Gender;
    birthdate: Date;
    employmentStartDate: Date;
  }
  
  export enum Gender {
    Male = 'Male',
    Female = 'Female'
  }
  