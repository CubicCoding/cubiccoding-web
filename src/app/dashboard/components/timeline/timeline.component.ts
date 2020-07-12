import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { TimelineService } from '@app/dashboard/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewChecked  {
  timelineProgress: number;
  timelineResource: string;
  topics: any;
  loading: boolean = false;
  error: string;
  progressPercent: number;

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.loading = true;
    this.timelineService.getClassroom()
      .subscribe(
        data => {
          this.timelineProgress = data.timelineProgress;
          this.timelineResource = data.timelineResource;
          this.getTimeline();
        },
        error => {
          this.loading = false;
          this.handleError(error.status);
        });
  }

  ngAfterViewChecked(): void {
    const currentProgressElement = document.getElementById(`${this.timelineProgress}`);
    if (currentProgressElement) {
      currentProgressElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  getTimeline() {
    this.timelineService.getTimelineResource(this.timelineResource).subscribe(
      data => {
        this.loading = false;
        this.topics = data;
        this.progressPercent = this.timelineProgress / this.topics.length * 100;
      },
      error => {
        this.loading = false;
        this.handleError(error.status);
      });
  }

  private handleError(statusCode: number) {
    if (statusCode == 404) {
      this.error = "No fue posible obtener el progreso en este momento, vuelve a intentarlo mas tarde.";
    }
  }
}
