import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VoucherComponent } from './auth/voucher/voucher.component';

import { SignUpGuard } from './auth/sign-up/sign-up.guard';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent, canActivate: [SignUpGuard]},
  {path: 'voucher', component: VoucherComponent},
  
  //TODO change this to scoreboard dashboard, which will redirect to sign-in if not loggedin
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
