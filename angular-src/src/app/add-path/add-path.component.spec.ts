import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPathComponent } from './add-path.component';

describe('AddPathComponent', () => {
  let component: AddPathComponent;
  let fixture: ComponentFixture<AddPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
