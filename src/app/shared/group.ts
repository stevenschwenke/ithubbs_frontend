export class Group {

  public id: string;

  name: string;
  url: string;
  description: string;
  links: HTMLLinkElement[];

  /**
   * Not transmitted from backend, extracted after call to backend
   */
  extractedImageURI: string;

  constructor(name: string, url: string, description: string) {
    this.name = name;
    this.url = url;
    this.description = description;
  }
}
