import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerWizardComponent } from './biller-wizard.component';

describe('BillerWizardComponent', () => {
  let component: BillerWizardComponent;
  let fixture: ComponentFixture<BillerWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
