import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorisedUsersComponent } from './unauthorised-users.component';

describe('UnauthorisedUsersComponent', () => {
  let component: UnauthorisedUsersComponent;
  let fixture: ComponentFixture<UnauthorisedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorisedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorisedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
