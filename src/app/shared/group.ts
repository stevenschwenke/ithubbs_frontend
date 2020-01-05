export class Group {

  public id: string;

  name: string;
  url: string;
  description: string;
  imageURI: string;

  constructor(name: string, url: string, description: string) {
    this.name = name;
    this.url = url;
    this.description = description;
  }
}
