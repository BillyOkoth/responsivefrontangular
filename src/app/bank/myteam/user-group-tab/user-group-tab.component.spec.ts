import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupTabComponent } from './user-group-tab.component';

describe('UserGroupTabComponent', () => {
  let component: UserGroupTabComponent;
  let fixture: ComponentFixture<UserGroupTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
