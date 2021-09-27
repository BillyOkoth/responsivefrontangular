import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeToBillerComponent } from './upgrade-to-biller.component';

describe('UpgradeToBillerComponent', () => {
  let component: UpgradeToBillerComponent;
  let fixture: ComponentFixture<UpgradeToBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeToBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeToBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
