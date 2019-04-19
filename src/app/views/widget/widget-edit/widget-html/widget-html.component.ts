import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  @ViewChild('updatehtml') updateHTMLFrom: NgForm;
  @ViewChild('deletehtml') deleteHTMLFrom: NgForm;
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

    console.log('html user id: ' + this.userId);
    console.log('html course number: ' + this.courseNumber);
    console.log('html widget id: ' + this.widgetId);
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

  updateHTML(){
    console.log('entering update html');
    if (!this.widget.name || this.widget.name.length === 0) {
      this.errorFlag = true;
      return;
    }

    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting update html');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Update HTML failed');
      }
    );
  }

  deleteHTML(){
    console.log('entering delete html');
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting delete html');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Delete HTML failed');
      }
    );
  }

}



