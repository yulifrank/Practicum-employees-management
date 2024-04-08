import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PositionService } from '../position.service';
import { Employee } from '../Models/employee.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { Position } from '../Models/position.model';

@Component({
  selector: 'app-add-employee-position',
  standalone: true,
  imports: [
    CommonModule,MatCheckboxModule,FormsModule, ReactiveFormsModule, MatInputModule,MatSelectModule,MatFormFieldModule,MatDatepickerModule
  ],
  templateUrl: './add-employee-position.component.html',
  styleUrl: './add-employee-position.component.scss'
})
export class AddEmployeePositionComponent implements OnInit {
  employeeId: number;
  employee: Employee;
  availablePositions: Position[];
  employeePositionForm: FormGroup;
  @ViewChild('picker3') picker3: MatDatepicker<Date>;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    public dialogRef: MatDialogRef<AddEmployeePositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private formBuilder: FormBuilder
  ) {
    this.employeeId = data.employeeId;
  }

  ngOnInit(): void {
    this.employeePositionForm = this.formBuilder.group({
      positionId: ['', Validators.required],
      entryDate: ['', Validators.required],
      isManagement: [false]
    });

    this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });

    this.positionService.getEmployeePositionsNotAssigned(this.employeeId).subscribe(positions => {
      this.availablePositions = positions;
    });

    this.employeePositionForm.get('entryDate').valueChanges.subscribe(() => {
      this.validateEntryDate();
    });
  }

  validateEntryDate() {
    const entryDate = this.employeePositionForm.get('entryDate').value;
    if (this.employee && new Date(entryDate) < new Date(this.employee.employmentStartDate)) {
      this.employeePositionForm.get('entryDate').setErrors({ invalidEntryDate: true });
    } else {
      this.employeePositionForm.get('entryDate').setErrors(null);
    }
  }

  onSubmit() {
    if (this.employeePositionForm.valid) {
      const formData = this.employeePositionForm.value;

      this.employeeService.addPositionToEmployee(this.employeeId, formData).subscribe(
        (response) => {
            if (response === null) {
                console.error('השירות החזיר ערך ריק (null)');
            } else {
                this.dialogRef.close(formData);
            }
        },
        (error) => {
            this.dialogRef.close(formData);
            console.error('שגיאה בהוספת מיקום:', error);
        }
      );
      
    }
  }
}



