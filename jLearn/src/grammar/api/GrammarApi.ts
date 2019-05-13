import firebase from "react-native-firebase";
export function getGrammars(requestData: any) {
    console.log("---API---RUN---", requestData)
    const _test = firebase.firestore().collection("bunpo_N3");
    console.log("---API---TEST---", _test);
    return new Promise((resolve, reject) => {
        return firebase.firestore().collection(requestData.collectionPath).onSnapshot((querySnapshot: any) => {
            if (querySnapshot) {
                console.log("---API---RUN---REF")

                resolve(querySnapshot);
            } else {
                reject('Error');
            }
        });
    });;
}
export function deleteGrammar(id: any) {
    console.log("---API---DEL---", id)
    return firebase.firestore().collection('grammars_N3').doc(id).delete()
        .then(response => {
            console.log("---API---DEL---RES", response)
        })
        .catch(error => {
            console.log("---API---DEL---ERROR", error)
        })
}