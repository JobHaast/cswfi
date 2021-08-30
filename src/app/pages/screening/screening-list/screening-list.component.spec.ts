import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ScreeningListComponent } from './screening-list.component';

describe('ScreeningListComponent', () => {
  let component: ScreeningListComponent;
  let fixture: ComponentFixture<ScreeningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreeningListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
