import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ScreeningService } from './screening.service';

describe('ScreeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScreeningService],
    });
  });

  it('should be created', () => {
    expect(ScreeningService).toBeTruthy();
  });
});
