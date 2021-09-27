import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectEditedGroupComponent } from './reject-edited-group.component';

describe('RejectEditedGroupComponent', () => {
  let component: RejectEditedGroupComponent;
  let fixture: ComponentFixture<RejectEditedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectEditedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectEditedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
