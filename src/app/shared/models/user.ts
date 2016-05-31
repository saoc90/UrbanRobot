export interface User {
    uid : string;
    email : string;
    role: string;
    isDeleted: boolean;
    
}

export enum UserRole{
    admin = 1,
    inventor = 2,
    visitor = 3
}