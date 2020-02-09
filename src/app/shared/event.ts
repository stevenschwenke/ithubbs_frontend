export class Event {

  id: string;

  datetime: Date;
  name: string;
  url: string;
  generalPublic: boolean;

  constructor(name: string, datetime: Date, url: string, generalPublic: boolean) {
    this.name = name;
    this.datetime = datetime;
    this.url = url;
    this.generalPublic = generalPublic;
  }
}
