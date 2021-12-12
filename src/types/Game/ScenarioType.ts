import MapType from "./MapType";

export default interface ScenarioType {
    uuid: string,
    name: string,
    description: string,
    image: string,
    map: MapType
};