import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedESlipComponent } from './generated-e-slip.component';

describe('GeneratedESlipComponent', () => {
  let component: GeneratedESlipComponent;
  let fixture: ComponentFixture<GeneratedESlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedESlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedESlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
