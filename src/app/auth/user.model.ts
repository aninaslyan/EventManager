export interface IUser {
  token: string;
  name: string;
  srName: string;
  isAdmin: boolean;
}

export class User implements IUser {
  constructor(public token: string, public name: string, public srName: string, public isAdmin: boolean) {
  }
}
