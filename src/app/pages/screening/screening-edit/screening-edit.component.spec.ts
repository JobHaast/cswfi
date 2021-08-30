import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningEditComponent } from './screening-edit.component';

describe('ScreeningEditComponent', () => {
  let component: ScreeningEditComponent;
  let fixture: ComponentFixture<ScreeningEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
