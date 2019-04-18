import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  @ViewChild('updateyoutube') updateYoutubeFrom: NgForm;
  @ViewChild('deleteyoutube') deleteYoutubeFrom: NgForm;
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

    console.log('youtube user id: ' + this.userId);
    console.log('youtube course number: ' + this.courseNumber);
    console.log('youtube widget id: ' + this.widgetId);
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

  updateYoutube(){
    console.log('entering update youtube');
    if (!this.widget.name || this.widget.name.length === 0) {
      this.errorFlag = true;
      return;
    }

    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting update youtube');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Update Youtube failed');
      }
    );
  }

  deleteYoutube(){
    console.log('entering delete youtube');
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting delete youtube');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Delete Youtube failed');
      }
    );
  }

}



