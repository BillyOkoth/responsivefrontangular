import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupDeleteComponent } from './user-group-delete.component';

describe('UserGroupDeleteComponent', () => {
  let component: UserGroupDeleteComponent;
  let fixture: ComponentFixture<UserGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
