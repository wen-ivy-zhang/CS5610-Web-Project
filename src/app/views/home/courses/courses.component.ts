import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../services/course.service.client';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../models/course.model.client';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // courses: Course[];

  courses = [
    {number: 'CS5800', name: 'Algorithm', rating: 5.0, numRating: 6},
    {number: 'CS5610', name: 'Web Dev', rating: 4.5, numRating: 4},
    {number: 'CS5001', name: 'Python', rating: 4.0, numRating: 2}
    ];

  constructor(private courseService: CourseService) {
    // this.courses = [];
  }

  ngOnInit() {
    // this.courseService.signatureCourses().subscribe(
    //   (courses: any) => {
    //     this.courses = courses;
    //     },
    //   (error: any) => console.log(error)
    // );
  }

}
