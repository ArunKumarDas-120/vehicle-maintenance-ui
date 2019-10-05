import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { SignUp } from '../model/sign-up';
import { UserCredential } from '../model/user-credential';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string ="http://localhost:4002/user/";

  constructor(private http: HttpClient,
    private storageServive: StorageService) { }

  public register(signupData: SignUp): Observable<User>{
    return this.http.post<User>(this.baseUrl+"signup",signupData);
  }

  public login(credential: UserCredential): Observable<User>{
    return this.http.post<User>(this.baseUrl +"signin",credential);
  }
  
  public logout(): void{
	  this.storageServive.clearStorage();
  }
}
