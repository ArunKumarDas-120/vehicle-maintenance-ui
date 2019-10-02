import { Component, OnInit } from '@angular/core';
import { SignUp } from '../../model/sign-up';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { UserCredential } from '../../model/user-credential';
import { User } from '../../model/user';
import { StorageService } from '../../service/storage.service';
import { MessageService } from '../../service/message.service';

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
    private storageServive: StorageService,
    private messageService: MessageService) {
    this.signUpForm = new SignUp();
    this.loginForm = new UserCredential();
  }

  ngOnInit() {
  }

  public login(): void {
    this.loginService.login(this.loginForm).subscribe((data: User) => {
      if (data.userEmail != null) {
        this.storageServive.setData({ key: "logedInuser", data: data.userId });
        this.storageServive.setData({ key: "logedUserName", data: data.firstName + ' ' + data.lastName });
        this.router.navigate(['/home', data.userId]);
      } else
        this.messageService.showMessage('Login Failed', 'UserName and Password is Wrong', 'error');
    }, (error: any) => {
      this.messageService.handleHttpError(error);
    });
  }
  public register(): void {
    this.loginService.register(this.signUpForm).subscribe((data: User) => {
      this.router.navigate(['/home', data.userId])
    },
      (error: any) => {
        this.messageService.handleHttpError(error);
      });
  }
}
