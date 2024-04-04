import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Models/employee.model';
import { EmployeePostModel } from './Models/employeePost.model';
import { EmployeePosition } from './Models/EmployeePosition.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7299/api/Employees'; // בסיס ה-URL לשירות ה-API

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  addEmployee(employee: EmployeePostModel): Observable<Employee> {
    return this.http.post<any>("https://localhost:7299/api/Employees", employee);
  }
  getPositionOfEmployeeById(employeeId:number,positionId:number): Observable<EmployeePosition> {
    return this.http.get<EmployeePosition>(`${this.baseUrl}/${employeeId}/position/${positionId}`); 
  }
  updateEmployee(id: number, employee: EmployeePostModel): Observable<Employee> {
    return this.http.put<any>(`https://localhost:7299/api/Employees/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  getEmployeePositions(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/position`);
  }

  addPositionToEmployee(id: number, position: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/position`, position);
  }
  updatePositionToEmployee(empId: number, positionId: number, employeePosition: EmployeePosition): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${empId}/position/${positionId}`, employeePosition);
    }
  deletePositionFromEmployee(id: number, positionId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}/position/${positionId}`);
  }
}

