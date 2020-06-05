import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';

import { ScoreboardService } from '@app/dashboard/scoreboard.service';
import { ScoreTest } from '@app/dashboard/models/score-test';

import { Constants } from '@app/_utils/constants';

@Component({
  selector: 'app-score-test-modal',
  templateUrl: './score-test-modal.component.html',
  styleUrls: ['./score-test-modal.component.css']
})
export class ScoreTestModalComponent implements OnInit {
  scoreTestForm: FormGroup;
  scoreTest: ScoreTest;
  submitted = false;
  scoreTestError: string;
  scoreTestloading: boolean = false;
  scoreAnswerloading: boolean = false;
  checkedAnswers = new Set<number>();
  scoredRatio: number;
  scoreAnswerError: string;
  userResultsFeedback: string;
  alertClass: string;
  canTestBeAnsweredByUser: boolean;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private scoreboardService: ScoreboardService) { }

  ngOnInit(): void {
    this.scoreTestForm = this.formBuilder.group({
      scoreTestUuid: ['', [Validators.required, Validators.minLength(5)]]
    });    
  }

  closeScoreTestModal() {
    if(this.userResultsFeedback) {//User answered the test
      this.activeModal.close(Constants.SCORE_TEST_FINISHED);
    } else if (this.scoreTest && !this.scoreAnswerError && this.canTestBeAnsweredByUser) {//User loaded the test but didn't answer (and can be answered by them)
      this.activeModal.close(Constants.SCORE_TEST_IN_PROGRESS);
    }
    this.activeModal.close(Constants.SCORE_TEST_GRACEFULLY_CLOSED);//no action needed when user doesn't load a question or there test cannot be answered by this user
  }

  // convenience getter for easy access to form fields
  get f() { return this.scoreTestForm.controls; }

  getScoreTest() {
    this.submitted = true;

    if(this.scoreTestForm.invalid) {
      return;
    }

    this.scoreTestloading = true;
    this.scoreboardService.getScoreTest(this.f.scoreTestUuid.value)
      .subscribe(
        scoreTest => {
          this.scoreTestloading = false;
          this.submitted = false;
          this.scoreTest = scoreTest;
          this.canTestBeAnsweredByUser = !this.isTestAlreadyAnswered(scoreTest.uuid) && !this.hasTheTestExpired(scoreTest.maxPermittedDate);
        },
        error => {
          this.scoreTestloading = false;
          this.submitted = false;
          this.handleScoreTestError(error.status);
        });
  }

  createScoreAnswer() {
    if(this.isTestAlreadyAnswered(this.scoreTest.uuid)) {
      this.scoreAnswerError = "Ya has contestado anteriormente a esta pregunta.";
      return;
    } else if (this.hasTheTestExpired(this.scoreTest.maxPermittedDate)) {
      this.scoreAnswerError = "Esta pregunta ha expirado.";
      return;
    }

    this.scoreAnswerloading = true;
    let userAnswers = Array.from(this.checkedAnswers.values());

    this.scoreboardService.createScoreAnswer(this.scoreTest.uuid, userAnswers)
      .subscribe(
        scoreAnswerResponse => {
          this.scoreAnswerloading = false;
          this.scoredRatio = scoreAnswerResponse.scoredRatio;
          this.setScoreAnswerFeedback(this.scoredRatio);
          this.setAsAlreadyAnswered(scoreAnswerResponse.scoreTestUuid);
        },
        error => {
          this.scoreAnswerloading = false;
          this.handleScoreAnswerError(error.status);
        }
      )
  }

  setScoreAnswerFeedback(scoredRatio: number) {
    if(scoredRatio == 1) {
      this.userResultsFeedback = `¡Felicidades! Obtuviste el 100% del score (${this.scoreTest.maxScore}).`;
      this.alertClass = "alert-success";
    } else if (scoredRatio > 0) {
      let scorePercent = scoredRatio * 100;
      this.userResultsFeedback = `!Nada mal! Obtuviste el ${scorePercent}% del score. Consulta el historial de tu Scoreboard para ver en 
      donde acertaste y cuales eran todas las respuestas correctas.`;
      this.alertClass = "alert-primary";
    } else {
      this.userResultsFeedback = "Lo sentimos, no lograste obtener puntos en esta pregunta. Consulta el historial de tu Scoreboard para ver " + 
      "cuales eran las respuestas correctas.";
      this.alertClass = "alert-danger";
    }
  }

  toggleUserAnswer(idx: number) {
    if(this.checkedAnswers.has(idx)) {
      this.checkedAnswers.delete(idx);
    } else {
      this.checkedAnswers.add(idx);
    }    
  }

  isOptionSelected(idx: number) {
    return this.checkedAnswers.has(idx);
  }

  private setAsAlreadyAnswered(testUuid: string) {
    let userAnsweredTests = localStorage.getItem("userAnsweredTests");

    if(userAnsweredTests) {
      let userAnswersArray = JSON.parse(userAnsweredTests) as string[];
      userAnswersArray.push(testUuid);

      localStorage.setItem("userAnsweredTests", JSON.stringify(userAnswersArray));
    } else {
      localStorage.setItem("userAnsweredTests", JSON.stringify([testUuid]));
    }
  }

  private isTestAlreadyAnswered(scoreTestUuid: string): boolean {
    let userAnsweredTests = localStorage.getItem("userAnsweredTests");

    if(userAnsweredTests) {
      userAnsweredTests = JSON.parse(userAnsweredTests);
      return userAnsweredTests.includes(scoreTestUuid);
    }

    return false;
  }

  private hasTheTestExpired(maxPermittedDate: Date) {
    if(maxPermittedDate) {
      let rightNow = new Date().getTime();
      let testExpirationDate = new Date(maxPermittedDate).getTime();
  
      return rightNow >= testExpirationDate;
    }
    return false;
  }

  private handleScoreTestError(statusCode: number) {
    if(statusCode == 404) {
      this.scoreTestError = "No se encontró la pregunta.";
    }
  }

  private handleScoreAnswerError(statusCode: number) {
    switch(statusCode) {
      case 410: {
        this.scoreAnswerError = "Esta pregunta ha expirado.";
        break;
      }
      case 409: {
        this.scoreAnswerError = "Ya has contestado anteriormente a esta pregunta.";
        break;
      }
      case 404: {
        this.scoreAnswerError = "La pregunta no fue encontrada.";
        break;
      }
      case 424: {
        this.scoreAnswerError = "No pudimos encontrar tu scoreboard, por lo tanto la respuesta no fue guardada.";
        break;
      }
      case 400: {
        this.scoreAnswerError = "Debes seleccionar al menos una respuesta.";
        break;
      }
    }
  }
}
