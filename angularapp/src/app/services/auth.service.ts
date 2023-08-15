// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:8080/api'; // Replace with your Spring Boot backend URL

//   USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
//   username: any;
//   password: any;

//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<any> {
//     const body = { username, password };
//     return this.http.get<any>(`http://localhost:8080/api/auth/login`,
//      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
//       console.log(username)
//       this.username = username;
//       this.password = password;
//       this.registerSuccessfulLogin(username, password);
      
//     }));
// }

//   createBasicAuthToken(username: String, password: String) {
//     return 'Basic ' + window.btoa(username + ":" + password)
//   }


//   registerSuccessfulLogin(username: string, password: string) {
//     sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
//   }

//   isLoggedIn(): boolean {
//     // Check if the user token exists in localStorage
//     return !!localStorage.getItem('userToken');
//   }

//   getUserRole(): string {
//     // Get the user role from localStorage
//     const role=JSON.parse(localStorage.getItem('userRole') || '{}');
//     return role;
//   }

//   logout(): void {
//     // Clear the user data from localStorage
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('userRole');
//   }

//   private storeUserData(user: any): void {
//     // Save the user token and role in localStorage
//     localStorage.setItem('userToken', user.token);
//     localStorage.setItem('userRole', user.role);
//   }

//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       // Handle the error (you can log it or perform other actions)
//       console.error(error);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }

//   isUserLoggedIn() {
//     let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
//     if (user === null) return false
//     return true
//   }

//   getLoggedInUserName() {
//     let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
//     if (user === null) return ''
//     return user
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log(body)
    return this.http.post<any>(`${this.baseUrl}auth/login`, body).pipe(
      tap((user) => this.storeUserData(user)),
      catchError(this.handleError<any>('login'))
    );
  }

  register(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post<any>(`${this.baseUrl}/register`, body).pipe(
      tap((user) => this.storeUserData(user)),
      catchError(this.handleError<any>('register'))
    );
  }

  isLoggedIn(): boolean {
    // Check if the user token exists in localStorage
    return !!localStorage.getItem('userToken');
  }

  getUserRole(): string {
    // Get the user role from localStorage
    const role=JSON.parse(localStorage.getItem('userRole') || '{}');
    return role;
  }

  logout(): void {
    // Clear the user data from localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
  }

  private storeUserData(user: any): void {
    // Save the user token and role in localStorage
    localStorage.setItem('userToken', user.token);
    localStorage.setItem('userRole', user.role);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Handle the error (you can log it or perform other actions)
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
