import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {CourseService} from '../../../services/course.service.client';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})

export class WidgetChooserComponent implements OnInit {
  // @ViewChild('newpage') myNewPageFrom: NgForm;
  // @ViewChild('h') headingFrom: NgForm;
  // @ViewChild('deletepage') deletePageFrom: NgForm;
  userId: string;
  courseNumber: string;
  course: any;
  widget: Widget;

  // errorFlag: boolean;
  // errorMsg = 'Registration failed!';

  constructor(private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService,) { }

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

  createWidget(widgetType: string){
    console.log('entering  createWidget');
    // const newWidget : Widget = {
    //   widgetType: widgetType, pageId:'100', size:'1',text:'text',url:'url',width:'100%'
    // }
    const newWidget = new Widget('name', widgetType, '100', '1', 'text', '100%', 'url',
      '1', 'placeholder', false);
    this.widgetService.createWidget(this.course._id, newWidget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('new widget id ' + this.widget._id);
        console.log('new widget course id: ' + this.widget.courseId);
        console.log('new widget type: ' + this.widget.widgetType);

        const url: any = '/user/' + this.userId + '/courses/' + this.courseNumber + '/widget/' + this.widget._id;
        console.log('url:' + url);
        this.router.navigate([url]);
      }
    );
  }

}
