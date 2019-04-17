import {Component, OnInit} from '@angular/core';
import {Course} from '../../../../models/course.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';

@Component({
  selector: 'app-student-course-list',
  templateUrl: './student-course-list.component.html',
  styleUrls: ['./student-course-list.component.css']
})
export class StudentCourseListComponent implements OnInit {

  userId: String;
  // courses: Course[] = [];
  courses: any;
  // tempCourse: Course;
  tempCourse: any;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    console.log('user id: ' + this.userId);
    this.userService.findCoursesByUser(this.userId).subscribe(
      (data: any) => {
        this.courses = data;
        console.log('Student got courses');
      }
    );
  }

  rateCourse(courseNumber: String) {
    this.router.navigate(['/student', this.userId, 'courses', courseNumber]);
  }

  dropCourse(courseNumber: String) {
    console.log('Dropping Course: ' + courseNumber);
    this.courseService.findCourseByNumber(courseNumber).subscribe(
      (data: any) => {
        this.tempCourse = data;
        console.log(this.tempCourse);
        this.userService.deleteCourseForStudent(this.userId, this.tempCourse._id).subscribe(
          // (user: any) => {
          //   this.router.navigate(['/student', this.userId, 'courses']);
          // }
        );
        this.courseService.deleteStudentFromCourse(this.tempCourse._id, this.userId).subscribe(
          (course: any) => {
            this.tempCourse = course;
            this.router.navigate(['/student', this.userId, 'courses']);
          }
        );
      }
    );
  }

}
