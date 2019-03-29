import { UserModel } from '../interface';
class UserLogin {
    user: UserModel;
    constructor(user: UserModel) {
        this.user = user;
    }
}

export { UserLogin };