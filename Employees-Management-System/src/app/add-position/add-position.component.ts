import { Component } from '@angular/core';
import { PositionService } from '../position.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Position } from '../Models/position.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-position',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './add-position.component.html',
  styleUrl: './add-position.component.scss'
})
export class AddPositionComponent {

  positionName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  positionNameForm: FormGroup = new FormGroup({
    positionName: this.positionName,
  });
  constructor(
    private positionService: PositionService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddPositionComponent>
  ) {}

  onSubmit() {
    if (this.positionNameForm.valid) {
      const positionData: Position = {
        positionId: null,
        positionName: this.positionNameForm.get('positionName').value,
      };
  
      this.positionService.addPosition(positionData).subscribe(
        (response: Position | null) => {
          if (response === null) {
            this.showErrorMessage('הוספת התפקיד נכשלה. תפקיד כזה כבר קיים.');
          } else {
            // הוספת התפקיד הצליחה
            this.dialogRef.close();
          }
        },
        (error: any) => {
          console.error('Error adding position:', error);
          this.showErrorMessage('שגיאה בהוספת התפקיד. אנא נסה שוב מאוחר יותר.');
        }
      );
    }
  }
  showErrorMessage(message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '20%',
      data: { errorMessage: message }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // ניתן להוסיף פעולות נוספות לאחר סגירת הדיאלוג, אם נדרש
    });
  }
  
  goBack(){
    this.dialogRef.close(); 

  }
}
