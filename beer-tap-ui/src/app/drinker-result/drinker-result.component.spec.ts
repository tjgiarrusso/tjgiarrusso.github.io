import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkerResultComponent } from './drinker-result.component';

describe('DrinkerResultComponent', () => {
  let component: DrinkerResultComponent;
  let fixture: ComponentFixture<DrinkerResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkerResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
