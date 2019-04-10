export class Group {

  id: string;

  name: string;
  url: string;
  description: string;

  constructor(name: string, url: string, description: string) {
    this.name = name;
    this.url = url;
    this.description = description;
  }
}
