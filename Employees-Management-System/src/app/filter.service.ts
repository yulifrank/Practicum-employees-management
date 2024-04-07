import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './Models/employee.model';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filteredEmployeesSubject = new BehaviorSubject<Employee[]>([]);
  filteredEmployees$ = this.filteredEmployeesSubject.asObservable();

  constructor() {}

  updateFilter(dataSource: MatTableDataSource<Employee>, filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    dataSource.filter = filterValue;
    const filteredData = dataSource.filteredData;
    this.filteredEmployeesSubject.next(filteredData);
  }
}
