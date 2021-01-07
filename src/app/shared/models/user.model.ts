import { IUser } from '../interfaces';

export class User implements IUser {
  constructor(public token: string, public name: string, public srName: string, public isAdmin: boolean) { }
}
