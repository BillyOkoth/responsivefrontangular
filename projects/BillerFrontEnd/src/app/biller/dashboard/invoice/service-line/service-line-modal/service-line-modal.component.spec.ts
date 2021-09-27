import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLineModalComponent } from './service-line-modal.component';

describe('ServiceLineModalComponent', () => {
  let component: ServiceLineModalComponent;
  let fixture: ComponentFixture<ServiceLineModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLineModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
