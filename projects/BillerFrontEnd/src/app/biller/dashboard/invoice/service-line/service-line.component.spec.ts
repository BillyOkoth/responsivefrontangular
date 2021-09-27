import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLineComponent } from './service-line.component';

describe('ServiceLineComponent', () => {
  let component: ServiceLineComponent;
  let fixture: ComponentFixture<ServiceLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
