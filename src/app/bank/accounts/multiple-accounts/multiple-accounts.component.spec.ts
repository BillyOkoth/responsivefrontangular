import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAccountsComponent } from './multiple-accounts.component';

describe('MultipleAccountsComponent', () => {
  let component: MultipleAccountsComponent;
  let fixture: ComponentFixture<MultipleAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
