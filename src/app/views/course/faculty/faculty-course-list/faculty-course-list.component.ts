import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {Course} from '../../../../models/course.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-faculty-course-list',
  templateUrl: './faculty-course-list.component.html',
  styleUrls: ['./faculty-course-list.component.css']
})
export class FacultyCourseListComponent implements OnInit {

  userId: String;
  courses: Course[] = [];

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
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
