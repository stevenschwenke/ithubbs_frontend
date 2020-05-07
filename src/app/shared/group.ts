export class Group {

  public id: string;

  name: string;
  url: string;
  description: string;
  totalNumberOfEvents: number;
  averageNumberOfEventsPerMonth: number;
  daysPassedSinceFirstKnownEvent: number;
  daysPassedSinceLastKnownEvent: number;
  _links: HTMLLinkElementMap;

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

interface HTMLLinkElementMap {
  self: HTMLLinkElement;
  image: HTMLLinkElement;
}
