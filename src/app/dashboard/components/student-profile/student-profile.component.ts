import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AuthService} from '@app/auth/auth.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  constructor(private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    let studentName = this.authService.currentUserValue.name;
    this.toastr.success(`¡Bienvenido, ${studentName}!`);
  }

}
