import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTypesComponent } from './advanced-types.component';

describe('AdvancedTypesComponent', () => {
  let component: AdvancedTypesComponent;
  let fixture: ComponentFixture<AdvancedTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
