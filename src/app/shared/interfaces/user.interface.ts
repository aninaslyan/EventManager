export interface IUser {
    token: string;
    name: string;
    srName: string;
    isAdmin: boolean;
}

export interface IUserData {
    id: number;
    name: string;
    srName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface IAuthResponseData {
    token: string;
    user: IUserData;
}
