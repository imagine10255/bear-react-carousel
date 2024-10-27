import {IPrice} from "./_components/Prices/types";

export interface IData {
    id: string
    name: string
    minValidBet: number
    keepLevelDurationMonths: number
    prices: IPrice[],
}
