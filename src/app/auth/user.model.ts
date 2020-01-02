export interface IUser {
  token: string;
  name: string;
  srName: string;
}

export class User implements IUser {
  constructor(public token: string, public name: string, public srName: string) {
  }
}
