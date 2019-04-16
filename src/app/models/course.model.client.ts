export class Course {
  _id: String;
  name: String;
  faculty: String;
  number: String;
  description: String;
  rating: Number;
  sumRating: Number;
  numRating: Number;
  // classTimes: [{
  //   day: String,
  //   startTime: String,
  //   endTime: String}];
  classTimes: { day: String, startTime: String, endTime: String};
  startDate: Date;
  endDate: Date;
  term: String;
  location: String;


  constructor(name: String,
              number: String,
              classTimes: {day: String, startTime: String, endTime: String},
              startDate: Date,
              endDate: Date,
              term: String,
              location: String
              ) {
    // this._id = id;
    this.name = name;
    this.number = number;
    // this.description = description;
    // this.rating = rating;
    // this.numRating = numRating;
    this.classTimes = classTimes;
    this.startDate = startDate;
    this.endDate = endDate;
    this.term = term;
    this.location = location;
  }
}
