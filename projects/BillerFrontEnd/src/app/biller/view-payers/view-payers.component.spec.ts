import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayersComponent } from './view-payers.component';

describe('ViewPayersComponent', () => {
  let component: ViewPayersComponent;
  let fixture: ComponentFixture<ViewPayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
