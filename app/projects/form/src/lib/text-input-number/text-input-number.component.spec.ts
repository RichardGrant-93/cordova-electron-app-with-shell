import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputNumberComponent } from './text-input-number.component';

describe('TextInputNumberComponent', () => {
  let component: TextInputNumberComponent;
  let fixture: ComponentFixture<TextInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
