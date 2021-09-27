import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoffFileComponent } from './checkoff-file.component';

describe('CheckoffFileComponent', () => {
  let component: CheckoffFileComponent;
  let fixture: ComponentFixture<CheckoffFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoffFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoffFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
