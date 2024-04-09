import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';
import { Employee } from '../Models/employee.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { PositionsComponent } from '../positions/positions.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver'; 
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatFormFieldModule, MatTableModule, CommonModule, MatTooltip],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
  export class TopBarComponent implements OnInit {
    employees: MatTableDataSource<Employee>;
  
    constructor(private employeeService: EmployeeService, private filterService: FilterService,
      private dialog: MatDialog, private router: Router) {}
  
    ngOnInit(): void {
      this.getEmployees();
    }
  
    getEmployees(): void {
      this.employeeService.getEmployees().subscribe(employees => {
        this.employees = new MatTableDataSource<Employee>(employees);
      });
    }
  
    applyFilter(filterValue: string) {
      this.filterService.updateFilter(this.employees, filterValue);
    }
    
    
  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      height: '70%',
    });

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
    });
    this.getEmployees();


  }


  downloadData() {
    if ( this.employees ==null) 
    {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '350px',
        data: { errorMessage:"...אין מספיק נתונים להוריד "}
      });
      dialogRef.afterClosed().subscribe()

       }
    else{
    const data: any[] = this.employees.filteredData.map((employee: Employee) => {
      return {
        'שם פרטי': { v: employee.firstName, t: 's', s: { alignment: { horizontal: 'right' } } },
        'שם משפחה': { v: employee.lastName, t: 's', s: { alignment: { horizontal: 'right' } } },
        'תעודת זהות': { v: employee.identity, t: 's', s: { alignment: { horizontal: 'right' } } },
        'תאריך לידה': { v: employee.birthdate, t: 's', s: { alignment: { horizontal: 'right' } } }
      };
    });
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'employees.xlsx');
  }
  }
  
  
  openPositionDialog() {

    const dialogRef = this.dialog.open(PositionsComponent, {
      width: '60%',
      height: '70%',
    });

    dialogRef.afterClosed().subscribe(result => 
      {
      if (result === 'confirm') {
      };})

  }
}
