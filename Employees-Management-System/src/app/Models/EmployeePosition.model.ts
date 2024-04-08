import { Employee } from "./employee.model";
import { Position } from "./position.model";

  // employee-position.model.ts
  export interface EmployeePosition {
    employeeId: number;
    employee: Employee;
    positionId: number;
    position: Position;
    entryDate: Date;
    isManagement: boolean;
  }
  export interface EmployeePositionPostModel
  {
    positionId: number;
    entryDate: Date;
    isManagement: boolean;
  }
  