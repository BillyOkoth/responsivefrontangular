import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBillerAdminComponent } from './open-biller-admin.component';

describe('OpenBillerAdminComponent', () => {
  let component: OpenBillerAdminComponent;
  let fixture: ComponentFixture<OpenBillerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenBillerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBillerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
