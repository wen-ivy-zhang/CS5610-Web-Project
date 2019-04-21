import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../../models/course.model.client';
import {User} from '../../../../models/user.model.client';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

// @ts-ignore
@Component({
  selector: 'app-student-course-new',
  templateUrl: './student-course-new.component.html',
  styleUrls: ['./student-course-new.component.css']
})
export class StudentCourseNewComponent implements OnInit {

  userId: String;
  // user: User;
  user: any;
  tempfaculty: any;
  // courses: Course[] = [];
  // tempCourse: Course;
  courses: any;
  courselist: any;
  tempCourse: any;
  searchText: String;
  searchFlag = false;
  alreadyRegistered = false;
  Message = 'No courses found!';
  private snackBarDuration = 2000;
  // registerFlag = false;
  // registerMsg = 'Course Registered Successfully!';

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    console.log('user id: ' + this.userId);
    this.userService.findUserById(this.userId)
      .subscribe(
        (data: any) => {
          this.user = data;
          console.log('StudentCourseNewComponent: username:' + this.user.username);
        }
      );

    this.userService.findCoursesByUser(this.userId)
      .subscribe(
      (data: any) => {
        this.courses = data;
        console.log('Got user courses');
      }
    );

    this.courseService.signatureCourses().subscribe(
      (data: any) => {
        this.courselist = data;
        console.log('Got all courses');
      },
      (error: any) => console.log(error)
    );
  }

  searchCourses() {
    console.log('search Course: ' + this.searchText);
    this.alreadyRegistered = false; // initialize register flag to false
    this.courseService.findCourseByNumber(this.searchText)
      .subscribe(
      (data: any) => {
        this.tempCourse = data;
        console.log(this.tempCourse);
        if (this.tempCourse) {
          this.userService.findUserById(this.tempCourse.faculty)
            .subscribe(
              (res: any) => {
                this.tempfaculty = res;
                this.searchFlag = true;
                for (let i = 0; i < this.courses.length; i++) {
                  if (this.courses[i]._id === this.tempCourse._id) {
                    // if (this.courses[i]._id == this.tempCourse._id) {
                    this.alreadyRegistered = true;
                  }
                }
              }
            );
        } else {
          this.searchFlag = false;
        }
      },
      (error: any) => {
        this.searchFlag = false;
        console.log(error);
      }
    );
  }

  RegisterCourse() {
    console.log('Registering Course: ' + this.tempCourse);
    console.log('userId: ' + this.userId);
    console.log('courseId: ' + this.tempCourse._id);

    this.userService.addCourseForStudent(this.userId, this.tempCourse._id, this.user)
      .subscribe(
        (data: any) => {
          this.user = data;
          // this.registerFlag = true;
          this.alreadyRegistered = true;

          // pop the SnackBar to notify user registration success.
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          config.horizontalPosition = 'center';
          config.duration = this.snackBarDuration;
          this.snackBar.open('Course Registered Successfully!', '', config);
        }
      );
    this.courseService.addStudentToCourse(this.tempCourse._id, this.userId, this.tempCourse)
      .subscribe(
        (data: any) => {
          this.tempCourse = data;
        }
      );
  }

}
