import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayerComponent } from './create-payer.component';

describe('CreatePayerComponent', () => {
  let component: CreatePayerComponent;
  let fixture: ComponentFixture<CreatePayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
