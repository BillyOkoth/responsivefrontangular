import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredEslipsComponent } from './expired-eslips.component';

describe('ExpiredEslipsComponent', () => {
  let component: ExpiredEslipsComponent;
  let fixture: ComponentFixture<ExpiredEslipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredEslipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredEslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
