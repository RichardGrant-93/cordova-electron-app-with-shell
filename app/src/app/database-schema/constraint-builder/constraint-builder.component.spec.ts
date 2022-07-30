import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintBuilderComponent } from './constraint-builder.component';

describe('ConstraintBuilderComponent', () => {
  let component: ConstraintBuilderComponent;
  let fixture: ComponentFixture<ConstraintBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstraintBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstraintBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
