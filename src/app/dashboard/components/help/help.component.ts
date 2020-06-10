import { Component, OnInit } from '@angular/core';

import { fader } from '@app/route-animations';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  animations: [fader]
})
export class HelpComponent implements OnInit {
  //TODO this might have to come from server as we grow.. :)
  teacherInfoAaron = {
    name: "Aaron Arce",
    title: "Software Engineer",
    email: "aaronarce02@gmail.com",
    phone: "6691-01-72-57",
    avatarUrl: "assets/images/aaronarce.jpg"
  };

  teacherInfoMartin = {
    name: "Martin Cazares",
    title: "Android Engineer",
    email: "jm.cazaresg@gmail.com",
    phone: "6691-16-00-70",
    avatarUrl: "assets/images/martincazares.jpg"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
