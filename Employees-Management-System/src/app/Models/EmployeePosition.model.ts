// employee.model.ts
export interface Employee {
    code: number;
    firstName: string;
    lastName: string;
    identity: string;
    gender: Gender;
    birthdate: Date;
    employmentStartDate: Date;
  }
  
  // position.model.ts
  export interface Position {
    positionId: number;
    positionName: string;
  }
  
  // employee-position.model.ts
  export interface EmployeePosition {
    employeeId: number;
    employee: Employee;
    positionId: number;
    position: Position;
    entryDate: Date;
    isManagement: boolean;
  }
  
  // gender.enum.ts
  export enum Gender {
    Male = 'Male',
    Female = 'Female'
  }
  export interface EmployeePositionPostModel
  {
    positionId: number;
    entryDate: Date;
    isManagement: boolean;
  }
  