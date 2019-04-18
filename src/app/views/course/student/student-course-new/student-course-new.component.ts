import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../../models/course.model.client';
import {User} from '../../../../models/user.model.client';

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
  // courses: Course[] = [];
  // tempCourse: Course;
  courses: any;
  tempCourse: any;
  searchText: String;
  searchFlag = false;
  alreadyRegistered = false;
  Message = 'No courses found!';
  registerFlag = false;
  registerMsg = 'Course Registered Successfully!';

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

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
        console.log('Got courses');
      }
    );
  }

  searchCourses() {
    console.log('search Course: ' + this.searchText);
    this.courseService.findCourseByNumber(this.searchText)
      .subscribe(
      (data: any) => {
        this.tempCourse = data;
        console.log(this.tempCourse);
        if (this.tempCourse) {
          this.searchFlag = true;
          for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i]._id === this.tempCourse._id) {
            // if (this.courses[i]._id == this.tempCourse._id) {
              this.alreadyRegistered = true;
            }
          }
        }
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
          this.registerFlag = true;
          this.alreadyRegistered = true;
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
