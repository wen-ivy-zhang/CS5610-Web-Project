import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyNewComponent } from './faculty-new.component';

describe('FacultyNewComponent', () => {
  let component: FacultyNewComponent;
  let fixture: ComponentFixture<FacultyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
