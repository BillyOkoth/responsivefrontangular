import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCreatedGroupComponent } from './reject-created-group.component';

describe('RejectCreatedGroupComponent', () => {
  let component: RejectCreatedGroupComponent;
  let fixture: ComponentFixture<RejectCreatedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectCreatedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectCreatedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
