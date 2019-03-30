import { UserModel } from "./UserModel";
interface AuthenticationState {
    loggedIn: boolean;
    user?: any;
    isLoading: boolean;
}
export { AuthenticationState };

