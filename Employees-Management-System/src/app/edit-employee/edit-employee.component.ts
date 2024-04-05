import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { EmployeePostModel, Gender } from '../Models/employeePost.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeePositionsTableComponent } from '../employee-positions-table/employee-positions-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeePositionsTableComponent,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
  ],

  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  editingEmployee: Employee | null = null;
  employeeForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const employeeId = +this.route.snapshot.params['id']; // Converting id to number
    this.loadEmployee(employeeId);
  }

  loadEmployee(employeeId: number): void {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.editingEmployee = employee;
      this.employeeForm = this.formBuilder.group({
        firstName: [this.editingEmployee.firstName, [Validators.required,]],
        lastName: [this.editingEmployee.lastName, [Validators.required,]],
        identity: [this.editingEmployee.identity, [Validators.required, Validators.pattern('^[0-9]{9}$')]],

        birthdate: [this.formatDate(this.editingEmployee.birthdate), Validators.required],
        gender: [this.editingEmployee.gender, Validators.required],
        employmentStartDate: [this.formatDate(this.editingEmployee.employmentStartDate), Validators.required],
      });
      console.log(this.editingEmployee.gender)

      // הוספת האזנה לשינויים בשדות לאחר יצירת הטופס
      this.employeeForm.get('employmentStartDate').valueChanges.subscribe(() => {
        this.dateValidator();
      });

      this.employeeForm.get('birthdate').valueChanges.subscribe(() => {
        this.ageValidator(18);
      });
    });
  }



  ageValidator(minAge: number) {
    const birthdate = new Date(this.employeeForm.get('birthdate')?.value);
    const ageDifferenceMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifferenceMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < minAge) {
      this.employeeForm.get('birthdate')?.setErrors({ tooYoung: true });
    } else {
      this.employeeForm.get('birthdate')?.setErrors(null);
    }
  }

  dateValidator() {
    const startDate = new Date(this.employeeForm.get('employmentStartDate')?.value);
    const endDate = new Date(this.employeeForm.get('birthdate')?.value);

    if (startDate < endDate) {
      this.employeeForm.get('employmentStartDate')?.setErrors({ invalidStartDate: true });
    } else {
      this.employeeForm.get('employmentStartDate')?.setErrors(null);
    }
  }
  openMessageDialogSubmit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '150px',
      data: { errorMessage: 'האם לשמור את השינוים?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.saveEmployeeChanges();
      }
    });
  }

  saveEmployeeChanges() {
    const employeeData = this.employeeForm.value;

    this.employeeService.updateEmployee(this.route.snapshot.params['id'], employeeData).subscribe(
      () => {
        console.log('successfully saved the changes');
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error saving the employee:', error);
      }
    );
  }

  formatDate(dateString: Date): string {
    // Convert date string to a format compatible with input type 'date'
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10); // Format: YYYY-MM-DD
  }

  cancelEdit(): void {
    // Reset the edit and return to the original data
    this.loadEmployee(this.route.snapshot.params['id']);
  }
  close() {
    this.router.navigate(['/']); // ניתוב לקומפוננטת הוספת תפקיד
  }
}