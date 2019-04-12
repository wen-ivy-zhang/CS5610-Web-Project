import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseNewComponent } from './student-course-new.component';

describe('StudentCourseNewComponent', () => {
  let component: StudentCourseNewComponent;
  let fixture: ComponentFixture<StudentCourseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
