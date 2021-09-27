import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDeletedGroupComponent } from './reject-deleted-group.component';

describe('RejectDeletedGroupComponent', () => {
  let component: RejectDeletedGroupComponent;
  let fixture: ComponentFixture<RejectDeletedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectDeletedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectDeletedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
