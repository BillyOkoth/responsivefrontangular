import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreExceptionsModalComponent } from './ignore-exceptions-modal.component';

describe('IgnoreExceptionsModalComponent', () => {
  let component: IgnoreExceptionsModalComponent;
  let fixture: ComponentFixture<IgnoreExceptionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgnoreExceptionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoreExceptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
