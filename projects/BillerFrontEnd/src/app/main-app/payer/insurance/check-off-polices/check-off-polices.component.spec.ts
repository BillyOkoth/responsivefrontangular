import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOffPolicesComponent } from './check-off-polices.component';

describe('CheckOffPolicesComponent', () => {
  let component: CheckOffPolicesComponent;
  let fixture: ComponentFixture<CheckOffPolicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOffPolicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOffPolicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
