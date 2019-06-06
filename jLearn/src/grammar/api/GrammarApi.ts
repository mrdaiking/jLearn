import firebase from "react-native-firebase";
export function getGrammars(requestData: any) {
    return new Promise((resolve, reject) => {
        return firebase.firestore().collection(requestData.collectionPath).onSnapshot((querySnapshot: any) => {
            if (querySnapshot) {

                resolve(querySnapshot);
            } else {
                reject('Error');
            }
        });
    });;
}
export function deleteGrammar(id: any, currentLevel: string) {
    return firebase.firestore().collection(currentLevel).doc(id).delete()
        .then(response => {
        })
        .catch(error => {
        })
}