import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbrellaFileComponent } from './umbrella-file.component';

describe('UmbrellaFileComponent', () => {
  let component: UmbrellaFileComponent;
  let fixture: ComponentFixture<UmbrellaFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmbrellaFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbrellaFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
