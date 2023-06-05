import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, of, tap, catchError} from 'rxjs';
import { environments } from 'src/environments/environments';
import { LoginDto } from '../../interfaces/proyection/loginDto.interface';
import { User } from '../../interfaces/user.interface';
import { SignupDto } from '../../interfaces/proyection/signupDto.interface';
import { Router } from '@angular/router';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';

export  interface TokenRefresh{
  accessToken:string;
  refreshToken:string;
  tokenType:string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatusSubject = new Subject<boolean>();
  private endPoint: string = environments.baseUrl;
  private router = inject(Router);
  private http = inject(HttpClient);
  constructor() {}

  userWithToken(user: LoginDto): Observable<any> {
    return this.http
      .post<any>(`${this.endPoint}/auth/login`, user)
      .pipe(tap((res) => console.log(res)));
  }

  signupUser(user: SignupDto): Observable<SignupDto> {
    return this.http.post<SignupDto>(`${this.endPoint}/auth/register`, user);
  }

  signupAdmin(user: SignupDto): Observable<SignupDto> {
    return this.http.post<SignupDto>(
      `${this.endPoint}/auth/signup-admin`,
      user
    );
  }

  existsName(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.endPoint}/auth/existsName?name=${name}`);
  }

  existsMail(mail: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.endPoint}/auth/existsMail?mail=${mail}`);
  }
  
  getCurrentUser():Observable<any> {
    return this.http.get(`${this.endPoint}/auth/current-user`)
    .pipe(
      catchError(e => of(e))
    );
  }

  refreshToken(token:string):Observable<TokenRefresh> {
    const body = { token: token };
    return this.http.post<TokenRefresh>(`${this.endPoint}/auth/refreshToken`,body)
  }

  setToken(accessToken: string) :boolean{
   localStorage.setItem('accessToken', accessToken);
   return true;
  }

  setRefreshToken(refresh:string){
    localStorage.setItem('refreshToken',refresh);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  //set userDetail
  setUser(user: string) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout():void {      
      localStorage.clear();
   
    //  this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean | any {
    let tokenString = localStorage.getItem('accessToken');
    if (tokenString == undefined || tokenString == '' || tokenString == null) {
      return false;
    } else {
      return true;
    }
  }

  //getUser
  getUser() {
    let userStrg = localStorage.getItem('user');
    if (userStrg != null) {
      return JSON.parse(userStrg);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role
  getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
