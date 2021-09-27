import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceLineComponent } from './update-service-line.component';

describe('UpdateServiceLineComponent', () => {
  let component: UpdateServiceLineComponent;
  let fixture: ComponentFixture<UpdateServiceLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateServiceLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateServiceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
