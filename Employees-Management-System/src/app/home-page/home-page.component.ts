import { Component } from '@angular/core';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { Router } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EmployeesListComponent,TopBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}
