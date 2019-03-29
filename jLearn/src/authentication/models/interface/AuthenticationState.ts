import { UserModel } from "./UserModel";
interface AuthenticationState {
    loggedIn: boolean;
    user?: UserModel;
    isLoading: boolean
}
export { AuthenticationState };

