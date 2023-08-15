import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Import Router
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let debugElement: DebugElement;


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [FormsModule, RouterTestingModule], // Use RouterTestingModule
  //     declarations: [HomeComponent],
  //     providers: [AuthService]
  //   }).compileComponents();
  // }));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [HomeComponent],
      providers: [AuthService]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    debugElement = fixture.debugElement;

  });

  fit('should create the HomeComponent', () => {
    expect(component).toBeTruthy();
  });
});
