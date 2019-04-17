import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {environment} from '../../environments/environment';
import {environment} from '../../environments/environment.prod';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private sharedService: SharedService,
    private router: Router) {}

  baseUrl = environment.baseUrl;

  register(username: String, password: String, type: String, firstName: String, lastName: String, email: String) {
    const user = {
      username: username,
      password: password,
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    return this._http.post(this.baseUrl + '/api/register', user, { withCredentials: true });
  }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/login', body, { withCredentials: true });
  }

  loggedIn() {
    return this._http.post(this.baseUrl + '/api/loggedIn', '', { withCredentials: true });
  }

  logout() {
    return this._http.post(this.baseUrl + '/api/logout', '',{ withCredentials: true });
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId);
  }

  findCoursesByUser(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/course');
  }

  addCourseForStudent(userId: String, courseId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/student/' + userId + '/course/' + courseId, user);
  }

  deleteCourseForStudent(userId: String, courseId: String) {
    return this._http.delete(this.baseUrl + '/api/student/' + userId + '/course/' + courseId);
  }

  updateUserInServer(userId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user);
  }

  deleteUserInServer(userId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId);
  }

  findAllFaculty() {
    return this._http.get(this.baseUrl + '/api/faculty');
  }

  findAllStudents() {
    return this._http.get(this.baseUrl + '/api/students');
  }


}
