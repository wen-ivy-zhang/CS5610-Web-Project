import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @ViewChild('updateheading') updateHeadFrom: NgForm;
  @ViewChild('deleteheading') deleteHeadFrom: NgForm;
  userId: string;
  courseNumber: string;
  widgetId: string;
  widget: Widget = new Widget('', '', '', '', '', '', '', '', '', false);
  errorFlag: boolean;
  errorMsg = 'Widget name is required!';

  constructor(private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.courseNumber = params['cnum'];
        this.widgetId = params['wgid'];
      }
    );

    console.log('header user id: ' + this.userId);
    console.log('header course number: ' + this.courseNumber);
    console.log('header widget id: ' + this.widgetId);
    this.widgetService.findWidgetById(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('Got widget, type' + this.widget.widgetType);
      },
      (error: any) => {
        console.log('Can not find widget.');
      }
    );

  }

  updateHeading(){
    console.log('entering update heading');
    if (!this.widget.name || this.widget.name.length === 0) {
      this.errorFlag = true;
      return;
    }

    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting update heading');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Update Heading failed');
      }
    );
  }

  deleteHeading(){
    console.log('entering delete heading');
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting delete heading');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Delete Heading failed');
      }
    );
  }

}



