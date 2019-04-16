import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  // user =  new User('1', 'alice', 'alice', 'Alice', 'Alice', 'alice@test.com', 'ADMIN');

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
