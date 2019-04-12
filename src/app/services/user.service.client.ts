import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
// import {environment} from '../../environments/environment.prod';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

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
    return this._http.post(this.baseUrl + '/api/register', user, { withCredentials: true })
      .pipe(
        map(
          (response: Response) => {
            return response.json();
          }
        )
      );
  }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/login', body, { withCredentials: true })
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  loggedIn() {
    return this._http.post(this.baseUrl + '/api/loggedIn', '', { withCredentials: true })
      .pipe(
        map(
          (res: any) => {
            const user = res.json();
            if (user !== 0) {
              this.sharedService.user = user;
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          }
        )
      );
  }

  logout() {
    return this._http.post(this.baseUrl + '/api/logout', '',{ withCredentials: true })
      .pipe(
        map(
          (res: Response) => {
            const data = res;
          }
        )
      );
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  findCoursesByUser(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/course')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  addCourseForStudent(userId: String, courseId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/student/' + userId + '/course/' + courseId, user)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  deleteCourseForStudent(userId: String, courseId: String) {
    return this._http.delete(this.baseUrl + '/api/student/' + userId + '/course/' + courseId)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  updateUserInServer(userId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  deleteUserInServer(userId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  findAllFaculty() {
    return this._http.get(this.baseUrl + '/api/faculty')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  findAllStudents() {
    return this._http.get(this.baseUrl + '/api/students')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }


}
