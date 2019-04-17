import {Component, OnInit, ViewChild} from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../../models/course.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @ViewChild('f') submitRatingFrom: NgForm;

  userId: String;
  courseNumber: String;
  course: any;
  rate = 0.0;
  comment = 'Please leave a comment here ...';

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

  submitRating() {
    this.course.comments.push(this.comment);
    this.course.numRating++;
    this.course.sumRating = this.course.sumRating + this.rate;
    this.course.rating = this.course.sumRating / this.course.numRating;
    console.log('rate: ' + this.rate + 'course overall rating: ' + this.course.rating);

    this.courseService.updateCourse(this.course._id, this.course).subscribe(
      (data: any) => {
        this.course = data;
        console.log('course id: ' + this.course._id);
        this.router.navigate(['/student', this.userId, 'courses']);
      }
    );
  }

}
