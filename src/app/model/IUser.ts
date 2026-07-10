export type Role = 'admin' | 'editor' | 'reader';

export interface IUserForm {
    name: string,
    password: string,
    confirmPassword: string,
    birthday: Date | null,
    role: Role | '',
}

export type IUser = Omit<IUserForm, 'confirmPassword'>;