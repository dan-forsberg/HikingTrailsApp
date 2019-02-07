import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPathComponent } from './edit-path.component';

describe('EditPathComponent', () => {
  let component: EditPathComponent;
  let fixture: ComponentFixture<EditPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
