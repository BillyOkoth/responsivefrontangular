import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ESlipsComponent } from './e-slips.component';

describe('ESlipsComponent', () => {
  let component: ESlipsComponent;
  let fixture: ComponentFixture<ESlipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ESlipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
