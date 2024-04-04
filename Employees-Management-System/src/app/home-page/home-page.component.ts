import { Component } from '@angular/core';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EmployeesListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog ) {}



  navigateToAddRole() {
    this.router.navigate(['/add-position']); // ניתוב לקומפוננטת הוספת תפקיד
  }

}
