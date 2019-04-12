import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCourseListComponent } from './faculty-course-list.component';

describe('FacultyCourseListComponent', () => {
  let component: FacultyCourseListComponent;
  let fixture: ComponentFixture<FacultyCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
