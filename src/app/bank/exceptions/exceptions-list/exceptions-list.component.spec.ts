import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsListComponent } from './exceptions-list.component';

describe('ExceptionsListComponent', () => {
  let component: ExceptionsListComponent;
  let fixture: ComponentFixture<ExceptionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
