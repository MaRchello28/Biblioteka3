export class User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        role: string,
        password: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
