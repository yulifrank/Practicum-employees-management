import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PositionService } from '../position.service';
import { Position } from '../Models/position.model';
import { AddPositionComponent } from '../add-position/add-position.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [  
    CommonModule,
     MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {
  positions: Position[] = [];
   icons: string[] = [
    'supervisor_account',
    'assistant',
    'medical_services',
    'local_hospital',
    'psychology',
    'cleaning_services',  ];
  
  constructor(
    private positionervice: PositionService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.loadPosition()
  
  }
  loadPosition(){
    this.positionervice.getAllPositions().subscribe((positions) => {
      this.positions = positions;
      console.log(this.positions);
    });
  }
  toAddposition(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '18%',
      height: '50%',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadPosition();
      // פעולות נוספות שתרצה לבצע לאחר סגירת הפופאפ הפנימי
    })
    }
  
  goBack(){
    this.dialog.closeAll(); 
  }
}
