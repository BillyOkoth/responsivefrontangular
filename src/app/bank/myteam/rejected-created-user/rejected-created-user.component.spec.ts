import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCreatedUserComponent } from './rejected-created-user.component';

describe('RejectedCreatedUserComponent', () => {
  let component: RejectedCreatedUserComponent;
  let fixture: ComponentFixture<RejectedCreatedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedCreatedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedCreatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
