import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { VoucherComponent } from './auth/components/voucher/voucher.component';
import { StudentProfileComponent } from '@app/dashboard/components/student-profile/student-profile.component';

import { SignUpGuard } from './auth/components/sign-up/sign-up.guard';
import { AuthGuard } from './auth/auth.guard';

import { CCRoutes } from '@app/_utils/routes';
import { ContactComponent } from './auth/components/contact/contact.component';

const routes: Routes = [
  {path: '', redirectTo: CCRoutes.STUDENT_PROFILE, pathMatch: 'full'},
  {path: CCRoutes.SIGN_IN, component: SignInComponent, data: { animation: 'signin' }},
  {path: CCRoutes.SIGN_UP, component: SignUpComponent, data: { animation: 'signup' }, canActivate: [SignUpGuard]},
  {path: CCRoutes.VOUCHER, component: VoucherComponent, data: { animation: 'voucher'}},
  {path: CCRoutes.CONTACT, component: ContactComponent, data: { animation: 'contact'}},
  {path: CCRoutes.STUDENT_PROFILE, component: StudentProfileComponent, data: { animation: 'studentProfile' }, canActivate: [AuthGuard]},

  { path: '**', redirectTo: CCRoutes.SIGN_IN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
