import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { VoucherComponent } from './auth/components/voucher/voucher.component';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { StudentProfileComponent } from './dashboard/components/student-profile/student-profile.component';

import { ToastrModule } from 'ngx-toastr';
import { ImagePreloaderDirective } from './shared/image-preloader.directive';
import { ContactComponent } from './auth/components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    VoucherComponent,
    StudentProfileComponent,
    ImagePreloaderDirective,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
