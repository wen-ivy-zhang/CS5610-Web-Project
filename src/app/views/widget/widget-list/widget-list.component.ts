import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {CourseService} from '../../../services/course.service.client';
import {UserService} from '../../../services/user.service.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: string;
  courseNumber: string;
  course: any;
  widgets: Widget[] = [];
  tempfaculty: any;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              public sanitizer: DomSanitizer) { }

  // receiving the emitted event
  // reorderWidgets(indexes) {
  //   console.log('enter reorderWidgets, widget list');
  //   // call widget service function to update widget as per index
  //   this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.courseNumber)
  //     .subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         this.widgets = data;
  //       }
  //     );
  // }

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
        this.widgetService.findWidgetsByCourseId(this.course._id).subscribe(
          (result: any) => {
            this.widgets = result;
            console.log('Got widgets:');
            // console.log(result);
          }
        );
        this.userService.findUserById(this.course.faculty)
          .subscribe(
            (res: any) => {
              this.tempfaculty = res;
            }
          );
      }
    );
  }

}

