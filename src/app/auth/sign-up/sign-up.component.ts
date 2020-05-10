import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';
import { MustMatch } from '@app/_utils/must-match.validator';
import { User } from '@app/shared/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;    

    if(this.signupForm.invalid) {
      return;
    }    

    let user = new User();
    user.username = this.signupForm.value.username;
    user.password = this.signupForm.value.password;
    user.email = localStorage.getItem('email');

    this.loading = true;
    this.authService.signup(user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['sign-in'])
        },
        errorInfo => {
          this.loading = false;
          alert(errorInfo.error.message);
        }
      )
  }

}
