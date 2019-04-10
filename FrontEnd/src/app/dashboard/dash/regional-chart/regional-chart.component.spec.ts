import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalChartComponent } from './regional-chart.component';

describe('RegionalChartComponent', () => {
  let component: RegionalChartComponent;
  let fixture: ComponentFixture<RegionalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
