import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MomentModule } from 'ngx-moment';

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
import { ScoreboardComponent } from './dashboard/components/scoreboard/scoreboard.component';
import { RankAvatarComponent } from './dashboard/components/rank-avatar/rank-avatar.component';
import { ScoreTestModalComponent } from './dashboard/components/score-test-modal/score-test-modal.component';
import { ScoreHistoryComponent } from './dashboard/components/score-history/score-history.component';
import { MultipleOptionHistoryComponent } from './dashboard/components/multiple-option-history/multiple-option-history.component';
import { ChallengeHistoryComponent } from './dashboard/components/challenge-history/challenge-history.component';
import { HelpComponent } from './dashboard/components/help/help.component';
import { StaffProfileCardComponent } from './dashboard/components/staff-profile-card/staff-profile-card.component';
import { TimelineComponent } from './dashboard/components/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    VoucherComponent,
    StudentProfileComponent,
    ImagePreloaderDirective,
    ContactComponent,
    ScoreboardComponent,
    RankAvatarComponent,
    ScoreTestModalComponent,
    ScoreHistoryComponent,
    MultipleOptionHistoryComponent,
    ChallengeHistoryComponent,
    HelpComponent,
    StaffProfileCardComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MomentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ScoreTestModalComponent
  ]
})
export class AppModule { }
