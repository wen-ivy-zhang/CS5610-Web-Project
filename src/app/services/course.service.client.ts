import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { environment } from '../../environments/environment';
import {environment} from '../../environments/environment.prod';
import { Course } from '../models/course.model.client';
import { map } from 'rxjs/operators';
import {User} from '../models/user.model.client';

@Injectable()
export class CourseService {

  constructor(private _http: HttpClient,) { }

  baseUrl = environment.baseUrl;

  createCourse(userId: String, course: Course) {
    const url = this.baseUrl + '/api/user/' + userId + '/course';
    return this._http.post(url, course);
  }

  findCourses(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/course';
    return this._http.get(url);
  }

  findCourseByNumber(courseNumber: String) {
    const url = this.baseUrl + '/api/coursenumber/' + courseNumber;
    console.log('client findCourseByNumber: ' + url);
    return this._http.get(url);
  }

  findCourseById(courseId: String) {
    const url = this.baseUrl + '/api/course/' + courseId;
    return this._http.get(url);
  }

  addStudentToCourse(courseId: String, userId: String, course: Course) {
    return this._http.put(this.baseUrl + '/api/course/' + courseId + '/student/' + userId, course);
  }

  deleteStudentFromCourse(courseId: String, userId: String) {
    return this._http.delete(this.baseUrl + '/api/course/' + courseId + '/student/' + userId);
  }

  updateCourse(courseId: String, course: Course) {
    const url = this.baseUrl + '/api/course/' + courseId;
    return this._http.put(url, course);
  }

  deleteCourse(courseId: String) {
    const url = this.baseUrl + '/api/course/' + courseId;
    return this._http.delete(url);
  }

  signatureCourses() {
    const url = this.baseUrl + '/api/signaturecourses/';
    return this._http.get(url);
  }
}
