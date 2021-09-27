import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPayersComponent } from './my-payers.component';

describe('MyPayersComponent', () => {
  let component: MyPayersComponent;
  let fixture: ComponentFixture<MyPayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
