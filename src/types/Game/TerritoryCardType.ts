/* eslint-disable semi */

import TerritoryType from "./TerritoryType";

export default interface TerritoryCardType {
    uuid: string;
    name: string;
    territory : TerritoryType
    troopType: string;
};