import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserDialogComponent} from '../../user-dialog/user-dialog.component';

@Component({
  selector: 'app-faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./faculty-edit.component.css']
})
export class FacultyEditComponent implements OnInit {

  user: User;
  faculty: User[];
  // user =  new User('1', 'alice', 'alice', 'Alice', 'Alice', 'alice@test.com', 'admin');
  // faculty = [
  //   new User('2', 'bob', 'bob', 'Bob', 'Bob', 'bob@test.com', 'FACULTY'),
  //   new User('3', 'joe', 'joe', 'Joe', 'Doe', 'jd@test.com', 'FACULTY')
  // ];

  constructor(private router: Router,
              private sharedService: SharedService,
              private userService: UserService,
              private dialog: MatDialog) {
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

  ngOnInit() {
    this.userService.findAllFaculty().subscribe(
      (faculty: User[]) => {
        this.faculty = faculty;
      }
    );
  }

  editUser({_id, username, firstName, lastName, email}: User) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      _id, username, firstName, lastName, email
    };

    const dialogRef = this.dialog.open(UserDialogComponent,
      dialogConfig);


    // dialogRef.afterClosed().subscribe(
    //   val => console.log('Dialog output:', val)
    // );

    return dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );

  }

}
