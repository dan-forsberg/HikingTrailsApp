import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBundleComponent } from './add-bundle.component';

describe('AddBundleComponent', () => {
  let component: AddBundleComponent;
  let fixture: ComponentFixture<AddBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
