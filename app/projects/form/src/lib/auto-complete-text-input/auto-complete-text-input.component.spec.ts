import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteTextInputComponent } from './auto-complete-text-input.component';

describe('AutoCompleteTextInputComponent', () => {
  let component: AutoCompleteTextInputComponent;
  let fixture: ComponentFixture<AutoCompleteTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCompleteTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
