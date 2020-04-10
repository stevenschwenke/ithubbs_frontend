import {Group} from './group';

export class Event {

  id: string;

  datetime: Date;
  name: string;
  url: string;
  group: Group;
  generalPublic: boolean;

  links: HTMLLinkElement[];

  constructor(name: string, datetime: Date, url: string, group: Group, generalPublic: boolean) {
    this.name = name;
    this.datetime = datetime;
    this.url = url;
    this.group = group;
    this.generalPublic = generalPublic;
  }
}
