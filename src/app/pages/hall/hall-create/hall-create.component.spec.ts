import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HallCreateComponent } from './hall-create.component';

describe('HallCreateComponent', () => {
  let component: HallCreateComponent;
  let fixture: ComponentFixture<HallCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HallCreateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
