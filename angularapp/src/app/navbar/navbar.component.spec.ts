import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [NavbarComponent],
      providers: [AuthService], // Provide the AuthService
    }).compileComponents();

    authService = TestBed.inject(AuthService); // Inject the AuthService
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    component.isLoggedIn = true;
    component.isAdmin = true;
    component.isOrganizer = false;

    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should show login and register links when not logged in', () => {
    component.isLoggedIn = false;
    component.isAdmin = false;
    component.isOrganizer = false;
    fixture.detectChanges();

    const loginLink = fixture.nativeElement.querySelector('a[routerLink="/login"]');
    const registerLink = fixture.nativeElement.querySelector('a[routerLink="/register"]');

    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
  });

  fit('should show admin link when isAdmin is true', () => {
    component.isAdmin = true;
    fixture.detectChanges();

    const adminLink = fixture.nativeElement.querySelector('a[routerLink="/admin"]');
    expect(adminLink).toBeTruthy();
  });

  fit('should show organizer link when isOrganizer is true', () => {
    component.isOrganizer = true;
    fixture.detectChanges();

    const organizerLink = fixture.nativeElement.querySelector('a[routerLink="/organizer"]');
    expect(organizerLink).toBeTruthy();
  });

  it('should show logout link when isLoggedIn is true', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const logoutLink = fixture.nativeElement.querySelector('a[ngIf="isLoggedIn"]');
    console.log(logoutLink);

    expect(logoutLink).toBeTruthy(); // Adjust based on your template content
  });



  it('should log out user', () => {
    spyOn(component['router'], 'navigate');
    component.logout();
    // expect(component.isLoggedIn).toBeFalse();
    // expect(component.isAdmin).toBeFalse();
    // expect(component.isOrganizer).toBeFalse();
    // expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call AuthService.login with correct arguments for organizer', () => {
    spyOn(authService, 'login');
    component.isOrganizer = true;
    component.logout();
    expect(authService.login).toHaveBeenCalledWith('organizer', 'password'); // Adjust the arguments as needed
  });

  it('should call logout method on form submission', () => {
    spyOn(component, 'logout');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.logout).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
