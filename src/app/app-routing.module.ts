import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VoucherComponent } from './auth/voucher/voucher.component';
import { StudentProfileComponent } from '@app/dashboard/components/student-profile/student-profile.component';

import { SignUpGuard } from './auth/sign-up/sign-up.guard';
import { AuthGuard } from './auth/auth.guard';

import { CCRoutes } from '@app/_utils/routes';

const routes: Routes = [
  {path: '', redirectTo: CCRoutes.STUDENT_PROFILE, pathMatch: 'full'},
  {path: CCRoutes.SIGN_IN, component: SignInComponent},
  {path: CCRoutes.SIGN_UP, component: SignUpComponent, canActivate: [SignUpGuard]},
  {path: CCRoutes.VOUCHER, component: VoucherComponent},
  {path: CCRoutes.STUDENT_PROFILE, component: StudentProfileComponent, canActivate: [AuthGuard]},
  
  { path: '**', redirectTo: CCRoutes.SIGN_IN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
