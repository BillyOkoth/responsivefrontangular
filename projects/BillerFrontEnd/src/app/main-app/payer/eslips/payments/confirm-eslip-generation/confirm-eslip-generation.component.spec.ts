import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEslipGenerationComponent } from './confirm-eslip-generation.component';

describe('ConfirmEslipGenerationComponent', () => {
  let component: ConfirmEslipGenerationComponent;
  let fixture: ComponentFixture<ConfirmEslipGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEslipGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEslipGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
