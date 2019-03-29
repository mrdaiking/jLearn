import { UserModel } from '../interface';
class UserRegister {
    user: UserModel;
    constructor(user: UserModel) {
        this.user = user;
    }
}

export { UserRegister };