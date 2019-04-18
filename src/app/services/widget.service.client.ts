import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class WidgetService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl;

  api = {
    'createWidget' : this.createWidget,
    'findWidgetsByCourseId' : this.findWidgetsByCourseId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(courseId: string, widget: Widget) {
    const url = this.baseUrl + '/api/course/' + courseId + '/widget';
    return this.http.post(url, widget);
  }

  findWidgetsByCourseId(courseId: string) {
    const url = this.baseUrl + '/api/course/' + courseId + '/widget';
    return this.http.get(url);
  }

  findWidgetById(widgetId: string) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url);
  }

  updateWidget(widgetId: string, widget: Widget) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.put(url, widget);
  }

  deleteWidget(widgetId: string) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url);
  }

  // reorderWidgets(startIndex: string, endIndex: string, courseId: string) {
  //   const url = this.baseUrl + '/api/course/' + courseId + '/widget?start=' + startIndex + '&end=' + endIndex;
  //   return this.http.put(url, '');
  // }

}
