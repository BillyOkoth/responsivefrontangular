import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePayerModalComponent } from './delete-payer-modal.component';

describe('DeletePayerModalComponent', () => {
  let component: DeletePayerModalComponent;
  let fixture: ComponentFixture<DeletePayerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePayerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
