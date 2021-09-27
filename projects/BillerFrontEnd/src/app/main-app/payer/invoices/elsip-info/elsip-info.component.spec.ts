import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElsipInfoComponent } from './elsip-info.component';

describe('ElsipInfoComponent', () => {
  let component: ElsipInfoComponent;
  let fixture: ComponentFixture<ElsipInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElsipInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElsipInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
