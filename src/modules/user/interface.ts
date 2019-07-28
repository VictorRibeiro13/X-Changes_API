
// interface USer
export interface UserInterface {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export interface UserInterfaceDetail extends UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
}

export function createUser({
    id, name, email, password,
}: any): UserInterface {
    return {
        id, name, email, password,
    };
}

export function createUsers(data: any[]): UserInterface[] {
    return data.map(createUser);
}

export function createUserById({
    id, name, email, password,
}: any): UserInterfaceDetail {
    return {
        id, name, email, password,
    };
}

export function createUserByEmail({
    id, name, email, password,
}: any): UserInterfaceDetail {
    return {
        id, name, email, password,
    };
}
