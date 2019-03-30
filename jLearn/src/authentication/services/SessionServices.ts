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
        if (response.user) {
            return response.user;
        } else {
            return response
        }
    } catch (error) {
        return error;
    }
}
export async function checkLoggedIn() {
    try {
        const response: any = await SessionAPI.checkLoggedIn();
        console.log('RES-LOGIC-CHECKED', response)
        if (response) {
            return response._user;
        } else {
            return response
        }
    } catch (error) {
        return error;
    }
}
