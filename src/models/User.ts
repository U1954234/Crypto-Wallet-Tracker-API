export class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.firstname = 'Test'
        this.lastname = 'User'
    }

    validatePassword(inputPassword: string): boolean {
        return inputPassword === this.password;
    }
    findOne() {
        return {firsname:this.firstname,lastname:this.lastname,username:this.username}
    }
}
