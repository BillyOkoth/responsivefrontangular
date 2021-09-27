import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedEslipsComponent } from './failed-eslips.component';

describe('FailedEslipsComponent', () => {
  let component: FailedEslipsComponent;
  let fixture: ComponentFixture<FailedEslipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedEslipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedEslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
