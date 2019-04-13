export class Course {
  _id: String;
  number: String;
  description: String;
  name: String;
  rating: Number;
  sumRating: Number;
  numRating: Number;


  constructor(id: String, number: String, description: String, name: String, rating: Number, sumRating: Number, numRating: Number) {
    this._id = id;
    this.number = number;
    this.description = description;
    this.name = name;
    this.rating = rating;
    this.sumRating = sumRating;
    this.numRating = numRating;
  }
}
