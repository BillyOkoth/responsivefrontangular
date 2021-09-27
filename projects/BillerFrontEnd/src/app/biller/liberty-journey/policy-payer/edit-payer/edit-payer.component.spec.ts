import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayerComponent } from './edit-payer.component';

describe('EditPayerComponent', () => {
  let component: EditPayerComponent;
  let fixture: ComponentFixture<EditPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
