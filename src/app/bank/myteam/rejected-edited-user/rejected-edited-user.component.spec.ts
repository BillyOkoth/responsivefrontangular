import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedEditedUserComponent } from './rejected-edited-user.component';

describe('RejectedEditedUserComponent', () => {
  let component: RejectedEditedUserComponent;
  let fixture: ComponentFixture<RejectedEditedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedEditedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedEditedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
