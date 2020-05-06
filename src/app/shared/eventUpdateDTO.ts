export class EventUpdateDTO {

  constructor(public id: string,
              public name: string,
              public datetime: Date,
              public url: string,
              public groupID: string,
              public generalPublic: boolean) {
  }
}
