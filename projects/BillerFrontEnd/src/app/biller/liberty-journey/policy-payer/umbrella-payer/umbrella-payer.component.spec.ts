import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbrellaPayerComponent } from './umbrella-payer.component';

describe('UmbrellaPayerComponent', () => {
  let component: UmbrellaPayerComponent;
  let fixture: ComponentFixture<UmbrellaPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmbrellaPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbrellaPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
