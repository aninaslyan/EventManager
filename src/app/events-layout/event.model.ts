export class Event {
  // todo image is optional for now
  constructor(public date: Date | string,
              public description: string,
              public name?: string,
              public eventType?: number | string,
              public image?: string,
              public id?: number) {
  }
}
