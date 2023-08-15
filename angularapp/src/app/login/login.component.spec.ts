import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Import Router
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let debugElement: DebugElement;


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [FormsModule, RouterTestingModule], // Use RouterTestingModule
  //     declarations: [LoginComponent],
  //     providers: [AuthService]
  //   }).compileComponents();
  // }));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [AuthService]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    debugElement = fixture.debugElement;

  });

  fit('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should call login method on admin login', () => {
    spyOn(authService, 'login').and.returnValue(of({ role: 'ADMIN' }));
    const router = TestBed.inject(Router); // Inject Router
    spyOn(router, 'navigate'); // Spy on router's navigate method

    component.username = 'admin';
    component.password = 'password';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('admin', 'password');
  });

  fit('should navigate to admin on admin login', () => {
    spyOn(authService, 'login').and.returnValue(of({ role: 'ADMIN' }));
    const router = TestBed.inject(Router); // Inject Router
    spyOn(router, 'navigate'); // Spy on router's navigate method

    component.username = 'admin';
    component.password = 'password';
    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['/admin']); // Use router's navigate method
  });


  fit('should call login method on organizer login', () => {
    spyOn(authService, 'login').and.returnValue(of({ role: 'ORGANIZER' }));
    const router = TestBed.inject(Router); // Inject Router
    spyOn(router, 'navigate'); // Spy on router's navigate method

    component.username = 'organizer';
    component.password = 'password';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('organizer', 'password');
  });

  fit('should navigate to organizer on organizer login', () => {
    spyOn(authService, 'login').and.returnValue(of({ role: 'ORGANIZER' }));
    const router = TestBed.inject(Router); // Inject Router
    spyOn(router, 'navigate'); // Spy on router's navigate method

    component.username = 'organizer';
    component.password = 'password';
    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['/organizer']); // Use router's navigate method
  });

  fit('should have empty username and password initially', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  // it('should disable the button when the form is invalid', () => {
  //   const button = fixture.nativeElement.querySelector('button');
  //   expect(button.disabled).toBeTruthy();

  //   component.username = 'testUser';
  //   fixture.detectChanges();
  //   expect(button.disabled).toBeTruthy();

  //   component.password = 'testPassword';
  //   fixture.detectChanges();
  //   expect(button.disabled).toBeFalsy();
  // });

  fit('should call login method on form submission', () => {
    spyOn(component, 'login');

    const button = fixture.nativeElement.querySelector('button');
    component.username = 'testUser';
    component.password = 'testPassword';
    fixture.detectChanges();

    button.click();

    expect(component.login).toHaveBeenCalled();
  });


  fit('should show username required error message', fakeAsync(() => {
    const usernameInput = debugElement.query(By.css('#username'));
    usernameInput.nativeElement.value = ''; // Set an empty value
    usernameInput.nativeElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();

    tick(); // Advance time to handle async operations

    const errorMessage = debugElement.query(By.css('.error-message'));
    // console.log(errorMessage);

    expect(errorMessage.nativeElement.textContent).toContain('Username is required');
  }));

  fit('should show password required error message', () => {
    const passwordInput = debugElement.query(By.css('#password'));
    passwordInput.nativeElement.value = ''; // Set an empty value
    passwordInput.nativeElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();

    const errorMessage = debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent).toContain('Password is required');
  });

  // fit('should disable submit button if form is invalid', () => {
  //   const submitButton = debugElement.query(By.css('button[type="submit"]'));

  //   // Set initial form control values
  //   const usernameInput = debugElement.query(By.css('#username'));
  //   const passwordInput = debugElement.query(By.css('#password'));

  //   usernameInput.nativeElement.value = ''; // Invalid username
  //   passwordInput.nativeElement.value = ''; // Invalid password

  //   usernameInput.nativeElement.dispatchEvent(new Event('input'));
  //   passwordInput.nativeElement.dispatchEvent(new Event('input'));

  //   fixture.detectChanges(); // Trigger change detection

  //   expect(submitButton.nativeElement.disabled).toBe(true);  // Expect button to be disabled
  // });






  // Add more test cases for different scenarios, e.g., invalid login, etc.
});
