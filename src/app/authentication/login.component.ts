import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginFailed = false;

  constructor(
    private route: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  public ngOnInit(): void {}

  public ngSubmit(): void {
  }

  private get returnUrl(): string {
    return this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
