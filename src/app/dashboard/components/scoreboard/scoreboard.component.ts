import { Component, OnInit } from '@angular/core';

import { ScoreboardService } from '@app/dashboard/scoreboard.service';
import { ScoreSecondary } from '@app/dashboard/models/score-secondary';
import { UserProfile } from '@app/shared/user-profile';
import { AuthService } from '@app/auth/auth.service';
import { Tournament } from '@app/dashboard/models/tournament';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ScoreTestModalComponent } from '@app/dashboard/components/score-test-modal/score-test-modal.component';

import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/_utils/constants';

import { fader } from '@app/route-animations';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
  animations: [fader]
})
export class ScoreboardComponent implements OnInit {
  secondaries: ScoreSecondary[];
  tournamentInfo: Tournament;
  userProfile: UserProfile;
  loading: boolean = false;
  error: string;
  nonFirstPlaceIconUrl: string = "assets/icons/cc-inverted-pentagon-blue.png";
  urlScoreTestUuid: string;

  constructor(private scoreboardService: ScoreboardService, private authService: AuthService, 
    private modalService: NgbModal, private toastr: ToastrService, private route: ActivatedRoute) {
    this.authService.userProfile.subscribe(userProfile => this.userProfile = userProfile);
    this.scoreboardService.scoreboardInfo.subscribe(scoreboardInfo => {
      this.secondaries = scoreboardInfo.secondaries;
      this.tournamentInfo = scoreboardInfo.tournamentInfo;
    });
  }

  ngOnInit(): void {
    this.checkForScoreTestUuidInUrl();

    if (!this.secondaries || !this.tournamentInfo) {
      this.refreshScoreboard();
    }
  }

  checkForScoreTestUuidInUrl() {
    this.route.queryParams.subscribe(params => {
      const scoreTestUuid = params[Constants.SCORE_TEST_UUID];

      if(scoreTestUuid) {
        this.urlScoreTestUuid = scoreTestUuid;
        this.openScoreTestModal();
      }
    });  
  }

  openScoreTestModal() {
    let options: NgbModalOptions = {
      beforeDismiss: () => {
        return false;
      }
    };

    const scoreTestModalRef = this.modalService.open(ScoreTestModalComponent, options);
    scoreTestModalRef.componentInstance.urlScoreTestUuid = this.urlScoreTestUuid;
    
    scoreTestModalRef.result
    .then((result) => {
      if(result == Constants.SCORE_TEST_FINISHED) {
        this.refreshScoreboard();//If the user finished the test (either well or wrong), refresh his scoreboard screen
      } else if (result == Constants.SCORE_TEST_IN_PROGRESS) {
        let toastrOptions = {timeOut: 5000, positionClass: 'toast-bottom-right'};
        this.toastr.warning("Contesta la prueba rápida para subir los puntos de tu Score.", "¡Oops, No terminaste!", toastrOptions);
      }
    }).catch((error) => {});
  }

  refreshScoreboard() {
    this.loading = true;
    this.scoreboardService.getScoreboard()
        .subscribe(
          data => {
            this.loading = false;
            if (data.secondaries) {
              this.secondaries = data.secondaries;
            }
            if (data.tournamentInfo) {
              this.tournamentInfo = data.tournamentInfo;
            }
          },
          error => {
            this.loading = false;
            this.handleError(error.status);
          });
  }

  roundScore(score: number) {
    return this.scoreboardService.roundScore(score);
  }

  private handleError(statusCode: number) {
    if (statusCode == 0) {
      this.error = "No fue posible obtener el scoreboard en este momento, vuelve a intentarlo mas tarde.";
    }
  }
}
