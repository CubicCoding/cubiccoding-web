import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  voucherForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.voucherForm = this.formBuilder.group({
      voucherUuid: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.voucherForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.voucherForm.invalid) {
      return;
    }

    let voucherUuid: string = this.voucherForm.value.voucherUuid;

    this.loading = true;
    this.authService.getVoucher(voucherUuid)
    .pipe(first())
    .subscribe(
      data => {
      localStorage.setItem('email', data.email);
      this.router.navigate(['sign-up']);
      },
      errorInfo => {
        this.loading = false;
        //TODO handle this with toast alert
        alert(errorInfo.error.message);
      });
  }
}
