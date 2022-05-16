import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutableListComponent } from './mutable-list.component';

describe('MutableTableComponent', () => {
  let component: MutableListComponent;
  let fixture: ComponentFixture<MutableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
