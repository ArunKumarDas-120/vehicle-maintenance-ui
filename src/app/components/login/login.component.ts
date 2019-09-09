import { Component, OnInit } from '@angular/core';
import { SignUp } from 'src/app/model/sign-up';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';
import { UserCredential } from 'src/app/model/user-credential';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpForm: SignUp;
  loginForm: UserCredential;
  constructor(private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private storageServive: StorageService) {
    this.signUpForm = new SignUp();
    this.loginForm = new UserCredential();
  }

  ngOnInit() {
  }

  public login(): void {
    this.loginService.login(this.loginForm).subscribe((data: User) => {
      if (data.userEmail != null){
        this.storageServive.setData({key: "logedInuser", data: data.userId});
        this.router.navigate(['/home', data.userId ]);
      }
      else
        this.toastService.show("Login Failed", "error");
    }, (error: any) => {
    });
  }
  public register(): void {
    this.loginService.register(this.signUpForm).subscribe((data: User) => {
      this.router.navigate(['/home', data.userId ])
    },
      (error: any) => {
        this.toastService.show(error.status, "error");
      });
  }
}
