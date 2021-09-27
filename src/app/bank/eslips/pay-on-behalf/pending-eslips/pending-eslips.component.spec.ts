import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEslipsComponent } from './pending-eslips.component';

describe('PendingEslipsComponent', () => {
  let component: PendingEslipsComponent;
  let fixture: ComponentFixture<PendingEslipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingEslipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingEslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
