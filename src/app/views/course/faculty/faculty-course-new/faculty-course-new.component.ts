import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassTimes, Course} from '../../../../models/course.model.client';

@Component({
  selector: 'app-faculty-course-new',
  templateUrl: './faculty-course-new.component.html',
  styleUrls: ['./faculty-course-new.component.css']
})
export class FacultyCourseNewComponent implements OnInit {

  @ViewChild('newcourse') NewCourseFrom: NgForm;
  userId: string;
  classTimes = new ClassTimes('', '', '');
  course: Course = new Course('', '', '', 0.0, 0.0,
    this.classTimes, new Date(), new Date(), '', '');

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
  }

  newCourse() {
    console.log(this.NewCourseFrom.value.name);
    console.log(this.NewCourseFrom.value.number);
    console.log(this.NewCourseFrom.value.description);
    console.log(this.NewCourseFrom.value.day);
    console.log(this.NewCourseFrom.value.startTime);
    console.log(this.NewCourseFrom.value.endTime);
    console.log(this.NewCourseFrom.value.startDate);
    console.log(this.NewCourseFrom.value.endDate);
    console.log(this.NewCourseFrom.value.term);
    console.log(this.NewCourseFrom.value.location);
    this.classTimes.day = this.NewCourseFrom.value.day;
    this.classTimes.startTime = this.NewCourseFrom.value.startTime;
    this.classTimes.endTime = this.NewCourseFrom.value.endTime;


    this.courseService.createCourse(
      this.userId,
      new Course(this.NewCourseFrom.value.name,
        this.NewCourseFrom.value.number,
        this.NewCourseFrom.value.description,
        0.0,
        0.0,
        this.classTimes,
        this.NewCourseFrom.value.startDate,
        this.NewCourseFrom.value.endDate,
        this.NewCourseFrom.value.term,
        this.NewCourseFrom.value.location)
    ).subscribe(
      (data: any) => {
        this.course = data;
        console.log('heck course id: ', this.course._id);
        console.log('check course name: ', this.course.name);
        if (this.course) {
          this.router.navigate(['/faculty', this.userId, 'courses']);
        }
      }
    );
  }

}
