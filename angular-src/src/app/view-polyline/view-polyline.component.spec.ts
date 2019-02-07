import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolylineComponent } from './view-polyline.component';

describe('ViewPolylineComponent', () => {
  let component: ViewPolylineComponent;
  let fixture: ComponentFixture<ViewPolylineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPolylineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPolylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
