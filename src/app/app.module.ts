import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// home component
import { HomeComponent } from './views/home/home/home.component';
import { LoginComponent } from './views/home/login/login.component';
import { RegisterComponent } from './views/home/register/register.component';
import { CoursesComponent } from './views/home/courses/courses.component';

// user component
import { StudentComponent } from './views/user/student/student.component';
import { FacultyComponent } from './views/user/faculty/faculty.component';
import { AdminComponent } from './views/user/admin/admin/admin.component';
import { AdminEditComponent } from './views/user/admin/admin-edit/admin-edit.component';
import { FacultyEditComponent } from './views/user/admin/faculty-edit/faculty-edit.component';
import { FacultyNewComponent } from './views/user/admin/faculty-new/faculty-new.component';
import { StudentEditComponent } from './views/user/admin/student-edit/student-edit.component';
import { StudentNewComponent } from './views/user/admin/student-new/student-new.component';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    StudentComponent,
    FacultyComponent,
    AdminComponent,
    AdminEditComponent,
    FacultyEditComponent,
    FacultyNewComponent,
    StudentEditComponent,
    StudentNewComponent,
    CourseEditComponent,
    FacultyCourseListComponent,
    FacultyCourseNewComponent,
    RatingComponent,
    StudentCourseListComponent,
    StudentCourseNewComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetViewComponent,
    WidgetHeaderComponent,
    WidgetHtmlComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
