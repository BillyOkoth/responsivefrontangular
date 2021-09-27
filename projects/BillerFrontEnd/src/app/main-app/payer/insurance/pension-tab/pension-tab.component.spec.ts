import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionTabComponent } from './pension-tab.component';

describe('PensionTabComponent', () => {
  let component: PensionTabComponent;
  let fixture: ComponentFixture<PensionTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
