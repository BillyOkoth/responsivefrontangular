import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedEslipsComponent } from './rejected-eslips.component';

describe('RejectedEslipsComponent', () => {
  let component: RejectedEslipsComponent;
  let fixture: ComponentFixture<RejectedEslipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedEslipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedEslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
