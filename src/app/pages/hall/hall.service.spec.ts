import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HallService } from './hall.service';
import { Hall } from './hall.model';
import { of } from 'rxjs';

let httpClientSpy: { get; put; post; delete: jasmine.Spy };
let hallService: HallService;
let authServiceSpy: { get: jasmine.Spy };
describe('HallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HallService],
    });
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put',
    ]);
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'register',
      'logout',
      'createHeaders',
    ]);
    hallService = new HallService(httpClientSpy as any, authServiceSpy as any);
  });

  it('should be created', () => {
    expect(HallService).toBeTruthy();
  });

  it('Should return list of halls (HttpClient called once)', () => {
    const expectedHalls: Hall[] = [
      { _id: '1', name: 'Hall 1', seats: 50, description: 'Description' },
      { _id: '2', name: 'Hall 2', seats: 50, description: 'Description' },
      { _id: '3', name: 'Hall 3', seats: 50, description: 'Description' },
    ];

    httpClientSpy.get.and.returnValue(of(expectedHalls));

    hallService.getAll().subscribe((halls) => {
      expect(halls).toEqual(expectedHalls, 'Expected halls');
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'One call');
  });

  it('should return an error when the server returns a 404 when lokking for multiple halls', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    hallService.getAll().subscribe(
      (halls) => console.log('HIERZO!', halls),
      (err) => expect(err.message).toContain('test 404 error')
    );
  });

  it('Should return one hall (HttpClient called once)', () => {
    const expectedHall: Hall = {
      _id: '1',
      name: 'Hall 1',
      seats: 50,
      description: 'Description',
    };

    httpClientSpy.get.and.returnValue(of(expectedHall));

    hallService.getById(expectedHall._id).subscribe((hall) => {
      expect(hall).toEqual(expectedHall, 'Expected halls');
    });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'One call');
  });

  it('should return an error when the server returns a 404 when looking for one hall', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    hallService.getById('0').subscribe(
      (halls) => console.log('HIERZO!', halls),
      (err) => expect(err.message).toContain('test 404 error')
    );
  });

  it('Should edit a hall (HttpClient called once)', () => {
    const expectedHall: Hall = {
      _id: '1',
      name: 'Hall 1',
      seats: 50,
      description: 'Description',
    };

    httpClientSpy.put.and.returnValue(of(expectedHall));

    hallService.editHall(expectedHall._id, expectedHall).subscribe((hall) => {
      expect(hall).toEqual(expectedHall, 'Expected hall');
    });

    expect(httpClientSpy.put.calls.count()).toBe(1, 'One call');
  });

  it('should return an error when the server returns a 404 when editing a hall', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.put.and.returnValue(of(errorResponse));

    hallService
      .editHall('0', {
        _id: '0',
        name: 'Hall 1',
        seats: 50,
        description: 'Description',
      })
      .subscribe(
        (halls) => console.log('HIERZO!', halls),
        (err) => expect(err.message).toContain('test 404 error')
      );
  });

  it('Should create a hall (HttpClient called once)', () => {
    const expectedHall: Hall = {
      _id: '1',
      name: 'Hall 1',
      seats: 50,
      description: 'Description',
    };

    httpClientSpy.post.and.returnValue(of(expectedHall));

    hallService.createHall(expectedHall).subscribe((hall) => {
      expect(hall).toEqual(expectedHall, 'Expected hall');
    });

    expect(httpClientSpy.post.calls.count()).toBe(1, 'One call');
  });

  it('should return an error when the server returns a 404 when creating a hall', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.post.and.returnValue(of(errorResponse));

    hallService
      .createHall({
        _id: '0',
        name: 'Hall 1',
        seats: 50,
        description: 'Description',
      })
      .subscribe(
        (halls) => console.log('HIERZO!', halls),
        (err) => expect(err.message).toContain('test 404 error')
      );
  });

  it('Should delete a hall (HttpClient called once)', () => {
    const expectedHall: Hall = {
      _id: '1',
      name: 'Hall 1',
      seats: 50,
      description: 'Description',
    };

    httpClientSpy.delete.and.returnValue(of(expectedHall));

    hallService.deleteHall(expectedHall._id).subscribe((hall) => {
      expect(hall).toEqual(expectedHall, 'Expected hall');
    });

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'One call');
  });

  it('should return an error when the server returns a 404 when deleting a hall', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.delete.and.returnValue(of(errorResponse));

    hallService.deleteHall('0').subscribe(
      (halls) => console.log('HIERZO!', halls),
      (err) => expect(err.message).toContain('test 404 error')
    );
  });
});
