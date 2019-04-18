import { HeaderModel } from './index';
interface GrammarModel {
    id?: any,
    createTime: any,
    head?: HeaderModel,
    main: string,
    mean: string,
    examples: Array<string>
    tails: Array<string>,
    usage: string,
    image: any,
    category: string
}

export { GrammarModel };