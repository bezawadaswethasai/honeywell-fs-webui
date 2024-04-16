import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskindexComponent } from './riskindex.component';

describe('RiskindexComponent', () => {
  let component: RiskindexComponent;
  let fixture: ComponentFixture<RiskindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
