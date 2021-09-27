import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePayerComponent } from './single-payer.component';

describe('SinglePayerComponent', () => {
  let component: SinglePayerComponent;
  let fixture: ComponentFixture<SinglePayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
