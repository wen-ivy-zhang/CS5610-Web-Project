import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCourseNewComponent } from './faculty-course-new.component';

describe('FacultyCourseNewComponent', () => {
  let component: FacultyCourseNewComponent;
  let fixture: ComponentFixture<FacultyCourseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyCourseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyCourseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
