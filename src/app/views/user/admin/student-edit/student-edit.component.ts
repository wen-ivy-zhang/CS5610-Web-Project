import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserDialogComponent} from '../../user-dialog/user-dialog.component';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  user: User;
  students: User[];
  // user =  new User('1', 'alice', 'alice', 'Alice', 'Alice', 'alice@test.com', 'ADMIN');
  // students = [
  //   new User('4', 'john', 'john', 'John', 'Doe', 'jd1@test.com', 'STUDENT'),
  //   new User('5', 'mary', 'mary', 'Mary', 'Cary', 'mc@test.com', 'STUDENT')
  // ];

  constructor(private router: Router,
              private sharedService: SharedService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.user = new User(null, null, null, null, null, null, null);
    this.students = [];
  }

  deleteUser(userId) {
    return this.userService.deleteUserInServer(userId).subscribe(
      () => {
        // this.router.navigate(['/admin/student']);
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.userService.findAllStudents().subscribe(
      (students: any) => {
        this.students = students;
      });
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
