import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  @ViewChild('update') updateCourseFrom: NgForm;
  @ViewChild('delete') deleteCourseFrom: NgForm;
  userId: String;
  courseNumber: String;
  course: any;
  errorFlag: boolean;
  errorMsg = 'Course name is required!';

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.courseNumber = params['cnum'];
      }
    );

    console.log('user id: ' + this.userId);
    console.log('course number: ' + this.courseNumber);
    this.courseService.findCourseByNumber(this.courseNumber).subscribe(
      (data: any) => {
        this.course = data;
        console.log('course id: ' + this.course._id);
      }
    );
  }


  updateCourse(){
    console.log('entering update course');
    if (!this.course.name || this.course.name.length === 0) {
      this.errorFlag = true;
      return;
    }

    this.courseService.updateCourse(this.course._id, this.course)
      .subscribe(
        (data: any) => {
          this.course = data;
          console.log('exiting update course');
          this.router.navigate(['/faculty', this.userId, 'courses']);
        }
      );
  }


  deleteCourse() {
    console.log('Deleting Course: ' + this.course.number);

    // remove the course from each registered student before deleting the course itself
    for (let i = 0; i < this.course.registeredStudents.length; i++) {
      this.userService.deleteCourseForStudent(this.course.registeredStudents[i], this.course._id).subscribe();
    }

    this.courseService.deleteCourse(this.course._id)
      .subscribe(
      (data: any) => {
        console.log('exiting delete course');
        this.router.navigate(['/faculty', this.userId, 'courses']);
      }
    );
  }



}
