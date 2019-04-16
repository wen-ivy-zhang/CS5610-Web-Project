import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';

@Component({
  selector: 'app-faculty-course-list',
  templateUrl: './faculty-course-list.component.html',
  styleUrls: ['./faculty-course-list.component.css']
})
export class FacultyCourseListComponent implements OnInit {

  userId: String;
  courses: any;

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
        console.log('Faculty got courses');
      }
    );
  }

  editCourse(courseNumber: String) {
    this.router.navigate(['/faculty', this.userId, 'courses', courseNumber]);
  }

}
