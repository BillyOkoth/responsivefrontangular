import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteBillerComponent } from './confirm-delete-biller.component';

describe('ConfirmDeleteBillerComponent', () => {
  let component: ConfirmDeleteBillerComponent;
  let fixture: ComponentFixture<ConfirmDeleteBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
