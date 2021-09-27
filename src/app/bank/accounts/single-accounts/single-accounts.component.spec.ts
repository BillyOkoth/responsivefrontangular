import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAccountsComponent } from './single-accounts.component';

describe('SingleAccountsComponent', () => {
  let component: SingleAccountsComponent;
  let fixture: ComponentFixture<SingleAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
