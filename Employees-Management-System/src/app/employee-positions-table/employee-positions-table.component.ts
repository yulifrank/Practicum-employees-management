import { Component, Input } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeePosition } from '../Models/EmployeePosition.model';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AddEmployeePositionComponent } from '../add-employee-position/add-employee-position.component';
import { EditEmployeePositionComponent } from '../edit-employee-position/edit-employee-position.component';

@Component({
  selector: 'app-employee-positions-table',
  standalone: true,
  imports: [    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
     MatTableModule,
     CommonModule,
     MatIconModule,],
  templateUrl: './employee-positions-table.component.html',
  styleUrl: './employee-positions-table.component.scss'
})
export class EmployeePositionsTableComponent {

  @Input() employeeId: number;
  employeePositions: MatTableDataSource<EmployeePosition>;


  constructor(private employeeService: EmployeeService,private router:Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.employeeId) {
      this.loadEmployeePositions(this.employeeId);
    }
  }

loadEmployeePositions(employeeId: number): void {
  this.employeeService.getEmployeePositions(employeeId).subscribe(positions => {
    this.employeePositions = new MatTableDataSource(positions);
  });
}
  openMessageDialogDelete(empPosition: EmployeePosition): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { errorMessage: 'האם ברצונך למחוק את התפקיד?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deletePosition(empPosition);
      }
    });
  }
  openAddPositionDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeePositionComponent, {
      width: '50%',
      height:'70%',
      data: { employeeId: this.employeeId } // Pass employeeId to the dialog component
    });

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
     this.loadEmployeePositions(this.employeeId)
    });
  }

  deletePosition(empPosition: EmployeePosition): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: { errorMessage: 'האם הינך בטוח שברצונך למחוק את תפקיד זה?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.deletePositionFromEmployee(empPosition.employeeId, empPosition.positionId).subscribe(
          () => {
            this.employeePositions.data = this.employeePositions.data.filter(position => position !== empPosition);
            console.log('התפקיד נמחק בהצלחה');

          },
          error => {
            console.error('שגיאה במחיקת התפקיד:', error);
          }
        );
      }
    });
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.employeePositions.filter = filterValue;

  }
  editPosition(empPosition: EmployeePosition) {
    const dialogRef = this.dialog.open(EditEmployeePositionComponent, {
      width: '450px',
      height: '450px',

      data: { employeeId: empPosition.employeeId, positionId: empPosition.positionId ,positionName:empPosition.position.positionName}
    });
  
    dialogRef.afterClosed().subscribe(result => {
this.loadEmployeePositions(this.employeeId)    });
}}
