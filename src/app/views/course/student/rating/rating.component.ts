import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {CourseService} from '../../../../services/course.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassTimes, Course} from '../../../../models/course.model.client';
import {NgForm} from '@angular/forms';

import { Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RatingComponent implements OnInit {
  @Input('rating') private rating = 0.0;
  @Input('starCount') private starCount = 5;
  @Input('color') private color = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration = 2000;
  private ratingArr = [];


  @ViewChild('f') submitRatingFrom: NgForm;

  userId: String;
  courseNumber: String;
  classTimes = new ClassTimes('', '', '');
  course: Course = new Course('', '', '', 0.0, 0, 0,
    this.classTimes, new Date(), new Date(), '', '');
  // rating = 0.0;
  comment = 'Please leave a comment here ...';

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    console.log('a ' + this.starCount);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    console.log('ratingArr' + this.ratingArr);


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
    console.log('comment: ' + this.comment);
    if (this.comment !== 'Please leave a comment here ...') {
      this.course.comments.push(this.comment);
    }
    this.course.numRating++;
    this.course.sumRating = this.course.sumRating + this.rating;
    this.course.rating = this.course.sumRating / this.course.numRating;
    console.log('rate: ' + this.rating);
    console.log('numRating' + this.course.numRating);
    console.log('sumRating' + this.course.sumRating);
    console.log('course overall rating: ' + this.course.rating);

    this.courseService.updateCourse(this.course._id, this.course).subscribe(
      (data: any) => {
        this.course = data;
        console.log('course id: ' + this.course._id);
        this.router.navigate(['/student', this.userId, 'courses']);
      }
    );
  }


  onClick(rate: number) {
    console.log('on click' + rate);
    this.rating = rate;
    this.snackBar.open('You rated ' + this.rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(this.rating);
    return false;
  }

  showIcon(index: number) {
    // console.log('enter showIcon');
    // console.log('rating: ' + this.rating + 'index: ' + index);
    if (this.rating >= index + 1) {
      // console.log('check1');
      return 'star';
    } else {
      // console.log('check2');
      return 'star_border';
    }
  }

}


export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}
