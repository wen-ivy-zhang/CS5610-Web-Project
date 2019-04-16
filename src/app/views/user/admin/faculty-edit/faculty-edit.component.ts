import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./faculty-edit.component.css']
})
export class FacultyEditComponent implements OnInit {

  user: User;
  faculty: User[];
  modalFlag: boolean;
  // user =  new User('1', 'alice', 'alice', 'Alice', 'Alice', 'alice@test.com', 'admin');
  // faculty = [
  //   new User('2', 'bob', 'bob', 'Bob', 'Bob', 'bob@test.com', 'FACULTY'),
  //   new User('3', 'joe', 'joe', 'Joe', 'Doe', 'jd@test.com', 'FACULTY')
  // ];

  constructor(private router: Router,
              private sharedService: SharedService,
              private userService: UserService) {

    this.user = new User(null, null, null, null, null, null, null);
    this.faculty = [];
  }

  deleteUser(userId) {
    return this.userService.deleteUserInServer(userId).subscribe(
      () => {
        // this.router.navigate(['/admin/faculty']);
        this.ngOnInit(); // refresh current page
      }
    );
  }

  findUserById(userId) {
    console.log('hit find user by id!!!');
    console.log(userId);
    this.userService.findUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
        console.log(this.user);
      }
    );
    if (this.user) {
      this.modalFlag = true;
      console.log('set modalFlag to true!!!');
    }
  }

  updateUser(userId, changed_user) {
    return this.userService.updateUserInServer(userId, changed_user).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.userService.findAllFaculty().subscribe(
      (faculty: User[]) => {
        this.faculty = faculty;
      }
    );
  }
}
