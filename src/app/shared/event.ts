export class Event {

  id: string;

  datetime: Date;
  name: string;
  url: string;


  constructor(name: string, datetime: Date, url: string) {
    this.name = name;
    this.datetime = datetime;
    this.url = url;
  }
}
