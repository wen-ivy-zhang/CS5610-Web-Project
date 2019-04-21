# CS6510-Project

Please see project description in [wiki](https://github.com/sunnyfz309/CS5610-Project/wiki).

### Contributing to this Project

* clone repo to local machine  
  ```
  git clone https://github.com/sunnyfz309/CS5610-Project.git
  ```  
* pull the lasted version to local machine
  ```
  git pull origin master
  ```
* create branch for changes on local
  ```
  git checkout -b <branch_name>
  ```
* push branch with changes to remote
  ```
  git push -u origin <branch_name>
  ```

### Testing Users
| Role        | Username      | password|
| ----------- |:-------------:| -------:|
| Admin       | test_admin    | 1       |
| Faculty     | test_faculty  | 1       |
| Student     | test_student  | 1       |


### Use case
* Anonymous: 
```
- view the homepage  
  note: google map is embedded with school set as a destination(3rd-party API: Google Maps)
- view course list(rating sort - signature courses)
- view school info(location using google map)
```
* Admin: 
```
1. register  
   - click the Register button on the homepage  
   - choose Admin as role  
   - fill in all the listed info  
   - click Register to redirect to the admin dashboard
2. login
   - click the Login button on the homepage  
   - choose Admin as role  
   - enter username: test_admin  
   - enter the password: 1  
   - click the "Login" button: you will be redirected to the admin dashboard  
3. edit faculty  
   - view a list of all the faculties with their personal info  
   - add, edit or delete a faculty as needed  
   note: deleting a faculty will delete all the courses he/she teaches, from courses database, and from  
   students' course lists if enrolled.
4. edit student  
   - view a list of all the students with their personal info  
   - add, edit or delete a student as needed  
5. edit personal info  
   - view admin's personal info  
   - edit or delete as needed  
6. Logout
   - click the Logout button in the dashboard
```
* Faculty: 
```
1. Login
   - click the Login button on the homepage  
   - choose Faculty as role  
   - enter username: test_faculty
   - enter the password: 1  
   - click the "Login" button: you will be redirected to the faculty dashboard  
2. Register
   - click the Register button on the homepage  
   - choose Faculty as role  
   - fill in all the listed info  
   - click Register to redirect to the faculty dashboard
3. View course list
   - click the "View your courses" button in the dashboard
   - view the list of all the courses test_faculty has enrolled
   - add, edit or delete a course as needed  
4. Add in a course
   - click the "Add new course" button in the course list.
   - enter a new course name, a course title and all the info listed
5. Edit a course
   - click on the "Edit" button next to a course.
   - update any info as needed
   note: if a student has enrolled in this course, any update on the course will be reflected in the  
   student's course list as well(i.e. cascade update)
6. Delete a course
   - click on the "Delete" button next to a course  
   - this course will be removed from the faculty's course list, the courses database, and the course  
   lists of any students who have enrolled in this course (i.e. cascade delete)
7. enter a course's website
   - click a course name to go to its website
   - add,edit or delete a widget in this course website as needed  
   note: add, edit or delete a widget is similar to homework  
         image upload is implemented and work(even though heroku will show error)  
         Flickr is implemented as well(3rd-party API with Search)  
8. Log out
   - click "Log out" button on the student dashboard
```
* Student: 
```
1. Login
   - click the Login button on the homepage  
   - choose Student as role  
   - enter username: test_student
   - enter the password: 1  
   - click the "Login" button: you will be redirected to the student dashboard  
   OR
   - click Login with Facebook" button(special feature for student)
2. Register
   - click the Register button on the homepage  
   - choose Student as role  
   - fill in all the listed info  
   - click Register to redirect to the student dashboard
3. View course list
   - click the "View your courses" button in the dashboard
   - view the list of all the courses test_student has enrolled
   - rate or drop a course as needed  
4. Enroll in a course
   - click the "Add new course" button in the course list.
   - search for a course name.
     Examples: 
      Enter "CS5002" to add this course. 
      Enter "hahaha" to see an alert "This course does not exist!". 
      Enter "CS5001" and the register button is disabled as you've already registered this course  
5. Rate a course
   - click on the "Rate" button next to a course  
   - choose a rating with the star bar.
   - click Submit
6. Drop a course
   - click on the "Delete" button next to a course  
   - this course will be removed from your course list  
7. View a course's website
   - click a course name to go to its website
   - the course website is only-view for student
8. View top-rated courses
   - click on the "View top-rated courses" button on the student dashboard
   - you will be redirected to the "Signature courses" page
   - click on the "back" button will lead you to the homepage
   note: test_student will remain logged in and click login again will go to test_student's dashboard  
9. Log out
   - click "Log out" button on the student dashboard
```
  
### Links
* [Youtube Demo](https://youtu.be/n_SUFhp8bxs)
* [Heroku Dashboard](https://dashboard.heroku.com/apps/cs5610-project)
* [Heroku App](https://cs5610-project.herokuapp.com/)
* [Project Requirement](https://onedrive.live.com/view.aspx?resid=5122A5DA1ABBEA0C!952&ithint=file%2cdocx&authkey=!ANFc4Yn-vxTaFik)
* [Project Plan](https://docs.google.com/document/d/1MnNQ41n_ykYNjYfnOvnKftkkIsZrU3J79_dvf2aNomA/edit#)

### Note
Like in previous assignments, the click of uploadImage button within Image widget won't redirect
to other pages, but will stay at the same edit page. User needs to cancel the request on the browser
to avoid request timeout error. This won't affect the image widget edit functionality.
