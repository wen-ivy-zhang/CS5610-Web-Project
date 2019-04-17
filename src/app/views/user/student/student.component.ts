import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  user: User;
  // user =  new User('5', 'mary', 'mary', 'Mary', 'Cary', 'mc@test.com', 'STUDENT');


  constructor(private userService: UserService,
              private sharedService: SharedService,
              public router: Router) { }


  logout() {
    this.sharedService.user = null;
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  ngOnInit() {
    this.user = this.sharedService.user;
  }


}
