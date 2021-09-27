import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EslipsAccountsComponent } from './eslips-accounts.component';

describe('EslipsAccountsComponent', () => {
  let component: EslipsAccountsComponent;
  let fixture: ComponentFixture<EslipsAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EslipsAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EslipsAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
