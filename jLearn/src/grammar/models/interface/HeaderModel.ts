import { AdjModel, VerbModel, NounModel } from "./index";
interface HeaderModel {
    verb?: Array<VerbModel>,
    noun?: NounModel,
    adj?: Array<AdjModel>
}
export { HeaderModel };