import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedEslipComponent } from './generated-eslip.component';

describe('GeneratedEslipComponent', () => {
  let component: GeneratedEslipComponent;
  let fixture: ComponentFixture<GeneratedEslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedEslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedEslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
