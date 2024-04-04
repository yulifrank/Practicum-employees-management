import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePositionsTableComponent } from './employee-positions-table.component';

describe('EmployeePositionsTableComponent', () => {
  let component: EmployeePositionsTableComponent;
  let fixture: ComponentFixture<EmployeePositionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePositionsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePositionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
