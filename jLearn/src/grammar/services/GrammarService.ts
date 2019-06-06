import * as GrammarAPI from "../api";
// import { GrammarListModel } from "../models/response";
import { GrammarResBase } from "../models/response"
export async function getGrammars(collectionPath: any) {
    try {
        const requestData = {
            collectionPath
        }
        const response: any = await GrammarAPI.getGrammars(requestData);
        // console.log("---SERVICE---RUN---", response)
        let grammarContainer: any = [];
        if (response) {
            response.forEach(function (document: any) {
                // console.log('----DOCUMENT--ID--', document.id)
                grammarContainer.push(document);

            });
        }
        const newGrammars = parseToGrammar(grammarContainer);
        // console.log('----DOCUMENT---', newGrammars);
        return newGrammars;
    } catch (error) {
        return error;
    }
}

let parseToGrammar = (documents: any): any => {
    let parsedGrammars = documents.map((document: any) => {
        let grammar = document.data();
        return {
            id: document.id,
            createTime: grammar.createTime,
            mains: grammar.mains,
            category: grammar.category,
            head: grammar.head,
            tails: grammar.tails,
            mean: grammar.mean,
            examples: grammar.examples,
            image: grammar.image,
            usage: grammar.usage
        }
    })
    return parsedGrammars;
}

