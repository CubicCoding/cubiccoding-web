import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-profile-card',
  templateUrl: './staff-profile-card.component.html',
  styleUrls: ['./staff-profile-card.component.css']
})
export class StaffProfileCardComponent implements OnInit {

  @Input() staffInformation: any;

  constructor() { }

  ngOnInit(): void {
  }

}
