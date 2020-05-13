import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  voucherForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

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
    this.error = '';
    // stop here if form is invalid
    if (this.voucherForm.invalid) {
      return;
    }

    let voucherUuid: string = this.voucherForm.value.voucherUuid;

    this.loading = true;
    this.authService.getVoucher(voucherUuid)
    .subscribe(
      voucher => {
      this.router.navigate(['sign-up']);
      },
      errorInfo => {
        this.loading = false;
        this.error = this.handleVoucherError(errorInfo.status);
      });
  }

  private handleVoucherError(statusCode: number): string {
    if(statusCode == 404) {
      return "Voucher no encontrado";
    } else if (statusCode == 410) {
      return "Voucher invalido";
    }
  }
}
