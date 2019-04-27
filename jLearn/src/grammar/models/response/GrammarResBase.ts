import { GrammarModel } from "../interface";

class GrammarResBase<T> {
    grammar?: GrammarModel
    constructor(response: any) {
        this.grammar = {
            createTime: response.createTime,
            main: response.main,
            category: response.category,
            head: response.head,
            tails: response.tails,
            mean: response.mean,
            examples: response.examples,
            image: response.image,
            usage: response.usage
        }
    }
    public getGrammar() {
        return this.grammar;
    }
}
export {
    GrammarResBase
}