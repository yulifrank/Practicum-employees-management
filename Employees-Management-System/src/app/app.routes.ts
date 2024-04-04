import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
// import { AddRoleComponent } from './add-position/add-position.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeePositionComponent } from './add-employee-position/add-employee-position.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'add-position/:id', component: AddEmployeePositionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
