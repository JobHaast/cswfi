import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HallDetailComponent } from './hall-detail.component';

describe('HallDetailComponent', () => {
  let component: HallDetailComponent;
  let fixture: ComponentFixture<HallDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HallDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
