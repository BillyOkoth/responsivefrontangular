import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDeleteBillerComponent } from './reject-delete-biller.component';

describe('RejectDeleteBillerComponent', () => {
  let component: RejectDeleteBillerComponent;
  let fixture: ComponentFixture<RejectDeleteBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectDeleteBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectDeleteBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
