/* eslint-disable semi */

import TerritoryBorderType from "./TerritoryBorderType";



export default interface TerritoryType {
    uuid: string,
    name: string,
    resourceIndex: number,
    territoryBorders: TerritoryBorderType[]
};