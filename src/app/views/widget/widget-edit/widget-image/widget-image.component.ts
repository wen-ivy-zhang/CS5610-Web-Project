import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
// import {environment} from '../../../../../environments/environment';
import {environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @ViewChild('updateimage') updateImageFrom: NgForm;
  @ViewChild('uploadimage') uploadImageFrom: NgForm;
  @ViewChild('deleteimage') deleteImageFrom: NgForm;
  userId: string;
  courseNumber: string;
  widgetId: string;
  widget: Widget = new Widget('', '', '', '', '', '', '', '', '', false);
  // uploadUrl: string = "No File Chosen";
  baseUrl: string = environment.baseUrl;
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

    console.log('image user id: ' + this.userId);
    console.log('image course number: ' + this.courseNumber);
    console.log('image widget id: ' + this.widgetId);
    this.widgetService.findWidgetById(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('Got widget, type' + this.widget.widgetType);
        console.log('Got widget, type' + this.widget.url);
      },
      (error: any) => {
        console.log('Can not find widget.');
      }
    );
  }

  updateImage(){
    console.log('entering update image');
    console.log('widget url' + this.widget.url);

    if (!this.widget.name || this.widget.name.length === 0) {
      this.errorFlag = true;
      return;
    }

    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting update image');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Update Image failed');
      }
    );
  }

  deleteImage(){
    console.log('entering delete image');
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('exiting delete image');
        this.router.navigate(['/faculty', this.userId, 'courses', this.courseNumber, 'widget']);
      },
      (error: any) => {
        console.log('Delete Image failed');
      }
    );
  }

}



