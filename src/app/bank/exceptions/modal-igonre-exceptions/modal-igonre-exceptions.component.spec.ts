import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIgonreExceptionsComponent } from './modal-igonre-exceptions.component';

describe('ModalIgonreExceptionsComponent', () => {
  let component: ModalIgonreExceptionsComponent;
  let fixture: ComponentFixture<ModalIgonreExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIgonreExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIgonreExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
