import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  userId: string;
  courseNumber: string;
  widgetId: string;
  widget: Widget = new Widget('', '', '', '', '', '', '', '', '', false);

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.courseNumber = params['cnum'];
        this.widgetId = params['wgid'];
      }
    );

    console.log('user id: ' + this.userId);
    console.log('course number: ' + this.courseNumber);
    console.log('widget id: ' + this.widgetId);

    this.widgetService.findWidgetById(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('widget type: ' + this.widget.widgetType);
      },
      (error: any) => {
        console.log('Can not find widget.');
      }
    );

  }
}


