import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAccountComponent } from './single-account.component';

describe('SingleAccountComponent', () => {
  let component: SingleAccountComponent;
  let fixture: ComponentFixture<SingleAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
