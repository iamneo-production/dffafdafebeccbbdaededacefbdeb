import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                message: 'Test Error Message'
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should display the error message', () => {
    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(errorMessageElement.textContent).toContain('Test Error Message');
  });
});
