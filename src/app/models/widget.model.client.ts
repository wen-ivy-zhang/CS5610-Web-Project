export class Widget {
  _id: string;
  name: string;
  widgetType: string;
  courseId: string;
  size: string;
  text: string;
  url: string;
  width: string;
  rows: string;
  placeholder: string;
  formatted: boolean;

  constructor(name = 'name', type, courseId, size= '1', text = 'text', width = '100%', url = 'url',
              rows = '1', placeholder = 'placeholder', formatted = false) {
    this.name = name;
    this.widgetType = type;
    this.courseId = courseId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
    this.rows = rows;
    this.placeholder = placeholder;
    this.formatted = formatted;
  }
}
