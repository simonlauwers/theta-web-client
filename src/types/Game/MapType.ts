import AreaType from "./AreaType";

export default interface MapType {
    uuid: string,
    name: string,
    areas : AreaType[]
};