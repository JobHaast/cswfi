import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, Subscription } from 'rxjs';
import { Hall } from '../hall.model';
import { HallService } from '../hall.service';
import { HallEditComponent } from './hall-edit.component';

let hallServiceSpy: {
  getAll;
  getById;
  editHall: jasmine.Spy;
  deleteHall;
  createHall: jasmine.Spy;
};

let toastrServiceSpy: {
  success: jasmine.Spy;
};

describe('HallEditComponent', () => {
  let component: HallEditComponent;
  let fixture: ComponentFixture<HallEditComponent>;

  beforeEach(async () => {
    hallServiceSpy = jasmine.createSpyObj('HallService', [
      'getAll',
      'getById',
      'editHall',
      'deleteHall',
      'createHall',
    ]);

    toastrServiceSpy = jasmine.createSpyObj('toastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [HallEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: HallService, useValue: hallServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: 1,
              })
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HallEditComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should retrieve right data', (done) => {
    const expectedHall: Hall = {
      _id: '1',
      name: 'Hall 1',
      seats: 50,
      description: 'Description',
    };

    hallServiceSpy.getById.and.returnValue(of(expectedHall));

    component.subscription1 = new Subscription();
    component.subscription2 = new Subscription();

    fixture.detectChanges();

    setTimeout(() => {
      expect(component.hall).toEqual(expectedHall);
      done();
    }, 200);
  });

  it('Should display right text on button', () => {
    const something: DebugElement = fixture.debugElement;
    const submitButton = something.query(By.css('button'));
    const button: HTMLElement = submitButton.nativeElement;
    expect(button.textContent).toEqual(' Edit hall ');
  });

  it('Should call success toast when form is valid and submitted', () => {
    const hall = {
      name: 'Hall 1',
      seats: 80,
      description: 'Description',
    };

    hallServiceSpy.editHall.and.returnValue(of(hall));

    component.ngOnInit();

    component.hallForm.patchValue(hall);

    component.onSubmit();

    expect(toastrServiceSpy.success.calls.count()).toBe(1, 'One call');
  });

  it('Should not call success toast when form is invalid', () => {
    const hall = {
      name: '',
      seats: 80,
      description: 'Description',
    };

    hallServiceSpy.editHall.and.returnValue(of(hall));

    component.ngOnInit();

    component.hallForm.patchValue(hall);
    console.log(component.hallForm.invalid);

    component.onSubmit();

    expect(toastrServiceSpy.success.calls.count()).toBe(0, 'One call');
  });
});
