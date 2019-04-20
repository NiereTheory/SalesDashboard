import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesTableComponent } from './my-sales-table.component';

describe('MySalesTableComponent', () => {
  let component: MySalesTableComponent;
  let fixture: ComponentFixture<MySalesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySalesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
