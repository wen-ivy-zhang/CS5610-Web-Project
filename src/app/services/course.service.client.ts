import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model.client';
import { map } from 'rxjs/operators';
import {User} from '../models/user.model.client';

@Injectable()
export class CourseService {

  constructor(private _http: HttpClient,) { }

  baseUrl = environment.baseUrl;

  createCourse(userId: String, course: Course) {
    const url = this.baseUrl + '/api/user/' + userId + '/course';
    return this._http.post(url, course)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }

  findCourses(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/course';
    return this._http.get(url)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }

  findCourseByNumber(courseNumber: String) {
    const url = this.baseUrl + '/api/coursenumber/' + courseNumber;
    return this._http.get(url)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }

  findCourseById(courseId: String) {
    const url = this.baseUrl + '/api/course/' + courseId;
    return this._http.get(url)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }

  addStudentToCourse(courseId: String, userId: String, course: Course) {
    return this._http.put(this.baseUrl + '/api/course/' + courseId + '/student/' + userId, course)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  deleteStudentFromCourse(courseId: String, userId: String) {
    return this._http.delete(this.baseUrl + '/api/course/' + courseId + '/student/' + userId)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  updateCourse(courseId: String, course: Course) {
    const url = this.baseUrl + '/api/course/' + courseId;
    return this._http.put(url, course)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }

  deleteCourse(courseId: String) {
    const url = this.baseUrl + '/api/course/' + courseId;
    return this._http.delete(url)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }

  signatureCourses() {
    const url = this.baseUrl + '/api/signaturecourses/';
    return this._http.get(url)
      .pipe(
        map(
          (res: Response) => {
            return res.json();
          }
        )
      );
  }
}
