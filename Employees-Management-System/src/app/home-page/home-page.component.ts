import { Component } from '@angular/core';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EmployeesListComponent,TopBarComponent],
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
