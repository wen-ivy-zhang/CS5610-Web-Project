import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './services/auth-guard.service';

// home component
import { HomeComponent } from './views/home/home/home.component';
import { LoginComponent } from './views/home/login/login.component';
import { RegisterComponent } from './views/home/register/register.component';
import { CoursesComponent } from './views/home/courses/courses.component';

// user component
import { StudentComponent } from './views/user/student/student.component';
import { FacultyComponent } from './views/user/faculty/faculty.component';
import {AdminComponent} from './views/user/admin/admin/admin.component';
import {AdminEditComponent} from './views/user/admin/admin-edit/admin-edit.component';
import {FacultyEditComponent} from './views/user/admin/faculty-edit/faculty-edit.component';
import {FacultyNewComponent} from './views/user/admin/faculty-new/faculty-new.component';
import {StudentEditComponent} from './views/user/admin/student-edit/student-edit.component';
import {StudentNewComponent} from './views/user/admin/student-new/student-new.component';

// course component
import { CourseEditComponent } from './views/course/faculty/course-edit/course-edit.component';
import { FacultyCourseListComponent } from './views/course/faculty/faculty-course-list/faculty-course-list.component';
import { FacultyCourseNewComponent } from './views/course/faculty/faculty-course-new/faculty-course-new.component';
import { RatingComponent } from './views/course/student/rating/rating.component';
import { StudentCourseListComponent } from './views/course/student/student-course-list/student-course-list.component';
import { StudentCourseNewComponent } from './views/course/student/student-course-new/student-course-new.component';

// widget component
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetViewComponent } from './views/widget/widget-view/widget-view.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import {FlickrImageSearchComponent} from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'student', component: StudentComponent, canActivate: [AuthGuard]},
  {path: 'faculty', component: FacultyComponent},
  {path: 'student/:uid/courses', component: StudentCourseListComponent},
  {path: 'student/:uid/courses/new', component: StudentCourseNewComponent},
  {path: 'student/:uid/courses/:cnum', component: RatingComponent},
  {path: 'faculty/:uid/courses', component: FacultyCourseListComponent},
  {path: 'faculty/:uid/courses/new', component: FacultyCourseNewComponent},
  {path: 'faculty/:uid/courses/:cnum', component: CourseEditComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/edit', component: AdminEditComponent},
  {path: 'admin/faculty', component: FacultyEditComponent},
  {path: 'admin/faculty/new', component: FacultyNewComponent},
  {path: 'admin/student', component: StudentEditComponent},
  {path: 'admin/student/new', component: StudentNewComponent},
  {path: 'faculty/courses', component: FacultyCourseListComponent},
  {path: 'faculty/courses/new', component: FacultyCourseNewComponent},
  {path: 'student/courses', component: StudentCourseListComponent},
  {path: 'student/courses/new', component: StudentCourseNewComponent},
  {path: 'student/:uid/courses/:cnum/widget', component: WidgetViewComponent},
  {path: 'faculty/:uid/courses/:cnum/widget', component: WidgetListComponent},
  {path: 'user/:uid/courses/:cnum/widget/new', component: WidgetChooserComponent},
  {path: 'user/:uid/courses/:cnum/widget/:wgid', component: WidgetEditComponent},
  {path: 'user/:uid/courses/:cnum/widget/:wgid/flickr', component: FlickrImageSearchComponent},
  // ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
