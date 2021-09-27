import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmListComponent } from './confirm-list.component';

describe('ConfirmListComponent', () => {
  let component: ConfirmListComponent;
  let fixture: ComponentFixture<ConfirmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
