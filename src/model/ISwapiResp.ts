import { IStarship } from "./IStarship"

export interface ISwapiResp {
    count: number
    next: string | null
    previous: string | null
    results: IStarship[]
}
