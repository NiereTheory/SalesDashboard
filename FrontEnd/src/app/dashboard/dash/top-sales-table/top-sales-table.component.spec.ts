import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSalesTableComponent } from './top-sales-table.component';

describe('TopSalesTableComponent', () => {
  let component: TopSalesTableComponent;
  let fixture: ComponentFixture<TopSalesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSalesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
