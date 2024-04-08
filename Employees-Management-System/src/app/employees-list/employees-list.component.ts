import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from '../employee.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTooltip } from '@angular/material/tooltip';
import { PositionsComponent } from '../positions/positions.component';
import { FilterService } from '../filter.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatFormFieldModule, MatTableModule, CommonModule, MatTooltip,MatProgressSpinnerModule,],
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  columnsToDisplay: string[] = ['firstName', 'lastName', 'identity', 'birthdate', 'actions'];
  employees: MatTableDataSource<Employee>;
  hasItems: boolean = false;
  filteredEmployees: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.filterService.filteredEmployees$.subscribe(filteredEmployees => {
      this.filteredEmployees = filteredEmployees;
      this.employees = new MatTableDataSource<Employee>(this.filteredEmployees);
      this.hasItems = this.filteredEmployees.length > 0;
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = new MatTableDataSource<Employee>(employees);
      this.hasItems = employees.length > 0;
    });
  }

  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { errorMessage: ' ?האם הינך רוצה למחוק את ' + employee.firstName + " " + employee.lastName }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.deleteEmployee(employee.code).subscribe(() => {
          this.getEmployees(); // Refresh data after deletion
        });
      }
    });
  }

  editEmployee(employeeId: number): void {
    console.log('Editing employee:', employeeId);
    this.router.navigate(['/edit-employee', employeeId]);
  }
  openPositionDialog(): void {
    const dialogRef = this.dialog.open(PositionsComponent, {
      width: '60%',
      height: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
      }
    });
  }
}
