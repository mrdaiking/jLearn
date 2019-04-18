import * as GrammarAPI from "../api";
export async function getGrammars(collectionPath: any) {
    try {
        const requestData = {
            collectionPath
        }
        const response = await GrammarAPI.getGrammars(requestData);
        return response;
    } catch (error) {
        return error;
    }
}
