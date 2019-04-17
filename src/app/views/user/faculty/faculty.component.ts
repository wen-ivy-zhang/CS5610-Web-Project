import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  user: User;
  // user = new User('4', 'john', 'john', 'John', 'Doe', 'jd1@test.com', 'FACULTY');

  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

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
