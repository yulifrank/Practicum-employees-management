import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { EmployeePosition, Position } from './Models/EmployeePosition.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private baseUrl = 'https://localhost:7299/api/Positions'; // בסיס ה-URL לשירות ה-API

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }

  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.baseUrl);
  }

  getEmployeePositionsNotAssigned(employeeId: number): Observable<Position[]> {
    return this.employeeService.getEmployeePositions(employeeId).pipe(
      switchMap(employeePositions => {
        return this.getAllPositions().pipe(
          map(allPositions => {
            return allPositions.filter(position => !employeePositions.some(empPos => empPos.positionId === position.positionId));
          })
        );
      })
    );
  }
}
