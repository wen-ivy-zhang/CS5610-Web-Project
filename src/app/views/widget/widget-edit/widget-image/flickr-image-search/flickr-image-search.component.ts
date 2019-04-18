import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {WidgetService} from '../../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  userId: string;
  courseNumber: string;
  widgetId: string;
  widget: Widget = new Widget('', '', '', '', '', '', '', '', '', false);
  photos: [any];
  error: string;
  searchText: string;

  constructor(private flickrService: FlickrService,
              private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.courseNumber = params['cnum'];
        this.widgetId = params['wgid'];
      }
    );

    console.log('flickr image user id: ' + this.userId);
    console.log('flickr course number: ' + this.courseNumber);
    console.log('flickr image widget id: ' + this.widgetId);
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

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log('entering photo search');
          console.log(data);
          let val = data;
          console.log('val: ' + val);
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    console.log('flickr: ' + url);
    this.widget.url = url;

    this.widgetService
      .updateWidget(this.widgetId, this.widget)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/user', this.userId, 'courses', this.courseNumber, 'widget', this.widgetId]);
          } else {
            this.error = 'failed!';
          }
        }
      );
  }

}
