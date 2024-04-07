import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Route, Router } from '@angular/router';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatStepperModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent {
  employeeForm: FormGroup;

  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  @ViewChild('picker2') picker2: MatDatepicker<Date>;

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private employeeService: EmployeeService, private dialog: MatDialog, private router: Router) {


    this.matIconRegistry.addSvgIcon(
      'custom_icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/custom_icon.svg')
    );
  }
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identity: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      employmentStartDate: ['', Validators.required]
    });

    this.employeeForm.get('employmentStartDate').valueChanges.subscribe(() => {
      this.dateValidator();
    });

    this.employeeForm.get('birthdate').valueChanges.subscribe(() => {
      this.ageValidator(18);
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

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '20%',
      data: { errorMessage: 'האם הינך בטוח רוצה להוסיף את עובד זה?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm();
      }
    });
  }

  submitForm() {
    if (this.employeeForm.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        data: { errorMessage: 'אנא המתן, טוען...' }
      });
  
      this.employeeService.addEmployee(this.employeeForm.value)
        .subscribe(
          response => {
            console.log('The data was successfully sent to the server:', response);
            dialogRef.close(); // Close loading dialog
  
            if (response === null) {
              const errorDialogRef = this.dialog.open(DialogComponent, {
                width: '20%',
                data: { errorMessage: 'תעודת זהות כזו כבר קיימת במערכת!' }
              });
  
            
          
            } else {
              this.dialog.closeAll()
              dialogRef.close(); // Close loading dialog
              this.router.navigate(['/edit-employee', response.code]);
            }
          },
          error => {
            console.error('Error sending data to the service:', error);
            dialogRef.close(); // Close loading dialog
  
            const errorDialogRef = this.dialog.open(DialogComponent, {
              width: '20%',
              data: { errorMessage: 'לא ניתן להכניס עובד זה!' }
            });
  
            errorDialogRef.afterClosed().subscribe(result => {
              this.dialog.closeAll(); // Close all open dialogs
            });
          }
        );
    } else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }
  

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goBack() {
    this.dialog.closeAll(); // Close all open dialogs

  }

}


