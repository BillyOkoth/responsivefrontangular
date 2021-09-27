import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsComponent } from './exceptions.component';

describe('ExceptionsComponent', () => {
  let component: ExceptionsComponent;
  let fixture: ComponentFixture<ExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
