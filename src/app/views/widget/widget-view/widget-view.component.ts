import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-view',
  templateUrl: './widget-view.component.html',
  styleUrls: ['./widget-view.component.css']
})
export class WidgetViewComponent implements OnInit {

  userId: string;
  courseNumber: string;
  course: any;
  widgets: Widget[] = [];

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              public sanitizer: DomSanitizer) { }

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
      }
    );
  }

}
