import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillerComponent } from './edit-biller.component';

describe('EditBillerComponent', () => {
  let component: EditBillerComponent;
  let fixture: ComponentFixture<EditBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
