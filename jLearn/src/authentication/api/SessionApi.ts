import { UserRegister, UserLogin } from "../models/request";
import firebase from "react-native-firebase";
export function loginEmailAndPassword(requestData: UserLogin) {
    return firebase.auth().signInWithEmailAndPassword(requestData.user.email, requestData.user.password)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error;
        })
}

export function checkLoggedIn() {
    return new Promise(function (resolve, reject) {
        firebase.auth().onAuthStateChanged((user: any) => {
            if (user) {
                resolve(user);
            } else {
                reject(user);
            }
        })
    })
}