"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.firstname = 'Test';
        this.lastname = 'User';
    }
    validatePassword(inputPassword) {
        return inputPassword === this.password;
    }
    findOne() {
        return { firsname: this.firstname, lastname: this.lastname, username: this.username };
    }
}
exports.User = User;
