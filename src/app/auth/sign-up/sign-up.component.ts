import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/auth/auth.service';
import { MustMatch } from '@app/_utils/must-match.validator';
import { User } from '@app/auth/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;    
    this.error = '';
    if(this.signupForm.invalid) {
      return;
    }

    let user = new User();
    user.username = this.signupForm.value.username;
    user.password = this.signupForm.value.password;
    user.email = this.authService.getUserEmail;

    this.loading = true;
    this.authService.signup(user)
      .subscribe(
        data => {
          this.router.navigate(['sign-in'])
        },
        errorInfo => {
          this.loading = false;
          this.error = this.handleSignupError(errorInfo.status);
        });
  }

  private handleSignupError(statusCode: number): string {
    if(statusCode == 422) {
      return "Este usuario ya existe";
    } else if (statusCode == 410) {
      return "Este correo ya esta asociado a una cuenta.";
    }
  }

}
