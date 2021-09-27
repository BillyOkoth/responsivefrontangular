import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoredExceptionsComponent } from './ignored-exceptions.component';

describe('IgnoredExceptionsComponent', () => {
  let component: IgnoredExceptionsComponent;
  let fixture: ComponentFixture<IgnoredExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgnoredExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoredExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
