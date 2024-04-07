import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeePosition,  } from '../Models/EmployeePosition.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { PositionService } from '../position.service';
import { Employee } from '../Models/employee.model';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Position } from '../Models/position.model';

@Component({
  selector: 'app-edit-position-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-employee-position.component.html',
  styleUrl: './edit-employee-position.component.scss'
})
export class EditEmployeePositionComponent implements OnInit {
  EditPositionEmployeeForm: FormGroup;
  positionlist: Position[];
  employeeId: number;
  positionId: number;
  employee: Employee;
  positionName:string
  employeePosition: EmployeePosition;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeePositionComponent>,
    private _employeeService: EmployeeService,
    private router: Router,
    private _positionService: PositionService,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number, positionId: number ,positionName:string},
  ) {
    this.employeeId = data.employeeId;
    this.positionId = data.positionId;
    this.positionName=data.positionName
  }

  ngOnInit(): void {
    this._employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
  
    this._employeeService.getPositionOfEmployeeById(this.employeeId, this.positionId).subscribe(pe => {
      this.employeePosition = pe;

  
      this.EditPositionEmployeeForm = this.formBuilder.group({
        isManagement: [this.employeePosition.isManagement],
        entryDate: [this.employeePosition.entryDate, Validators.required],
      });
  
      this.EditPositionEmployeeForm.get('entryDate').valueChanges.subscribe(() => {
        this.validateEntryDate();
      });
    });
  
    this._positionService.getEmployeePositionsNotAssigned(this.employeeId).subscribe(positions => {
      this.positionlist = positions;
    });
  }

  private validateEntryDate(): void {
    const entryDate = this.EditPositionEmployeeForm.get('entryDate').value;
    if (this.employee && new Date(entryDate) < new Date(this.employee.employmentStartDate)) {
      this.EditPositionEmployeeForm.get('entryDate').setErrors({ invalidEntryDate: true });
    } else {
      this.EditPositionEmployeeForm.get('entryDate').setErrors(null);
    }
  }

  save(): void {
    if (this.EditPositionEmployeeForm.valid) {
      const updatePositionEmployee: any = {
        positionId: this.positionId,
        isManagement: this.EditPositionEmployeeForm.get('isManagement').value,
        entryDate: this.EditPositionEmployeeForm.get('entryDate').value,
      };
      console.log(updatePositionEmployee)
      this._employeeService.updatePositionToEmployee(this.employeeId, this.positionId, updatePositionEmployee).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('שגיאה בעדכון התפקיד של העובד:', err);
        }
      });
    }
    this.router.navigate(['/edit-employee', this.employeeId]);
    this.dialogRef.close(this.EditPositionEmployeeForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}






// ngOnInit(): void {
//   this.employeePositionForm = this.formBuilder.group({
//     positionId: ['', Validators.required],
//     entryDate: ['', Validators.required],
//     isManagement: [false]
//   });

//   this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
//     this.employee = employee;
//   });

//   this.positionService.getEmployeePositionsNotAssigned(this.employeeId).subscribe(positions => {
//     this.availablePositions = positions;
//   });

//   // קריאה לפונקציית האימות בזמן שינוי בתאריך
//   this.employeePositionForm.get('entryDate').valueChanges.subscribe(() => {
//     this.validateEntryDate();
//   });
// }

// validateEntryDate() {
//   const entryDate = this.employeePositionForm.get('entryDate').value;
//   if (this.employee && new Date(entryDate) < new Date(this.employee.employmentStartDate)) {
//     this.employeePositionForm.get('entryDate').setErrors({ invalidEntryDate: true });
//   } else {
//     this.employeePositionForm.get('entryDate').setErrors(null);
//   }
// }