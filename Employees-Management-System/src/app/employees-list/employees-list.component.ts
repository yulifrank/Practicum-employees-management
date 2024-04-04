import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from '../employee.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; // ייבוא של MatToolbarModule

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'; // ייבוא ספריית xlsx לייצוא לקובץ אקסל
import { saveAs } from 'file-saver'; // ייבוא פונקציה saveAs מספריית file-saver
import { DialogComponent } from '../dialog/dialog.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [ MatToolbarModule, MatIconModule, MatFormFieldModule, MatTableModule,CommonModule ],
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'] 
})
export class EmployeesListComponent implements OnInit {
  columnsToDisplay: string[] = ['firstName', 'lastName', 'identity', 'birthdate','actions' ];
  employees: MatTableDataSource<Employee>;

  constructor( private dialog: MatDialog,private employeeService:EmployeeService,private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
    
      .subscribe(employees => {
        this.employees = new MatTableDataSource<Employee>(employees);
      });
  }
  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      height:'70%',
    });

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
        window.location.reload();
      } else {
        console.log('Dialog closed without form data');
        window.location.reload();

      }
    });

  }
  deleteEmployee(employee: Employee): void {
    console.log(employee.code)

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { errorMessage: 'האם ברצונך למחוק את ?'+employee.firstName+" "+employee.lastName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.deleteEmployee(employee.code)
          .subscribe(() => {
            this.getEmployees();
          });
      }
    });
  }
  editEmployee(employeeId: number): void {
    console.log('Editing employee:', employeeId);
    this.router.navigate(['/edit-employee', employeeId]);
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.employees.filter = filterValue;
  }
  downloadData() {
    const data: any[] = this.employees.filteredData.map((employee: Employee) => {
      return {
        'שם פרטי': employee.firstName,
        'שם משפחה': employee.lastName,
        'תעודת זהות': employee.identity,
        'תאריך לידה': employee.birthdate
      };
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    saveAs(blob, 'employees.xlsx');
  }
}