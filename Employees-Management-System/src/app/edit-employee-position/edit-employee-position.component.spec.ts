import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeePositionComponent } from './edit-employee-position.component';

describe('EditEmployeePositionComponent', () => {
  let component: EditEmployeePositionComponent;
  let fixture: ComponentFixture<EditEmployeePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeePositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
