import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectEditedBillerComponent } from './reject-edited-biller.component';

describe('RejectEditedBillerComponent', () => {
  let component: RejectEditedBillerComponent;
  let fixture: ComponentFixture<RejectEditedBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectEditedBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectEditedBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
