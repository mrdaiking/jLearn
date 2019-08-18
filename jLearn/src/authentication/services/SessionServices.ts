import * as SessionAPI from "../api";
import { UserLogin } from "../models/request";
export async function loginEmailAndPassword(email: string, password: string) {
    try {
        const requestData: UserLogin = {
            user: {
                email: email,
                password: password
            }
        }
        const response = await SessionAPI.loginEmailAndPassword(requestData);
        return response;
    } catch (error) {
        return error;
    }
}
export async function logOut() {
    console.log('--LOG-SESSION-SERVICES--LOGOUT--')
    try {
        const response = await SessionAPI.logOut();
        return response;
    } catch (error) {
        return error;
    }
}
