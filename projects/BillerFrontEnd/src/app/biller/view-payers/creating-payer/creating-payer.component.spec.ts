import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingPayerComponent } from './creating-payer.component';

describe('CreatingPayerComponent', () => {
  let component: CreatingPayerComponent;
  let fixture: ComponentFixture<CreatingPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
