import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  form: FormGroup;
  username: string;
  user: User;

  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) {_id, username, firstName, lastName, email}: User ) {

    this.username = username;

    this.findUserById(_id);

    this.form = fb.group({
      username: [username, Validators.required],
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      email: [email, Validators.required]
    });

  }

  ngOnInit() {

  }

  updateUser(userId, changed_user) {
    return this.userService.updateUserInServer(userId, changed_user).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  findUserById(userId) {
    console.log('hit find user by id!!!');
    console.log(userId);
    this.userService.findUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
        console.log('find user by id!!!');
        console.log(this.user);
      }
    );
  }

  save() {
    this.updateUser(this.user._id, this.form.value);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
