import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilmEditComponent } from './film-edit.component';

describe('FilmEditComponent', () => {
  let component: FilmEditComponent;
  let fixture: ComponentFixture<FilmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
