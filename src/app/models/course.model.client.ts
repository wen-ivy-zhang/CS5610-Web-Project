export class Course {
  _id: String;
  name: String;
  faculty: String;
  number: String;
  description: String;
  rating: Number;
  sumRating: Number;
  numRating: Number;
  widgets: [String];
  // classTimes: [{
  //   day: String,
  //   startTime: String,
  //   endTime: String}];
  classTimes: ClassTimes;
  startDate: Date;
  endDate: Date;
  term: String;
  location: String;
  registeredStudents: [String];
  comments: [String];


  constructor(name: String,
              number: String,
              description: String,
              rating = 0.0,
              numRating = 0.0,
              classTimes: ClassTimes,
              startDate: Date,
              endDate: Date,
              term: String,
              location: String
              ) {
    // this._id = id;
    this.name = name;
    this.number = number;
    this.description = description;
    this.rating = rating;
    this.numRating = numRating;
    this.classTimes = classTimes;
    this.startDate = startDate;
    this.endDate = endDate;
    this.term = term;
    this.location = location;
  }
}

export class ClassTimes {
  day: String;
  startTime: String;
  endTime: String;

  constructor(day: String, startTime: String, endTime: String) {
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
