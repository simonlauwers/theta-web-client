import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import Scenario from "../../../types/ScenarioType";
import fetchData from "../../../utils/data/FetchData";

const useGetScenarios = () => {
    const [isLoading, setIsloading] = useState(true);
    const [entities, setEntities] = useState<Scenario[]>([]);
    const [error, setError] = useState(false);
    const {data, status} = useQuery(['scenarios'], () => fetchData('map/allScenarios'));

    useEffect(() => {
        if (status === "loading") {
            setIsloading(true);
        }
        if (status === "error") {
            setError(true)
            setIsloading(false);
        }
        if (status === "success") {
            setEntities(data as unknown as Scenario[]);
            setIsloading(false);
        }
    }, [status, data])

    return {isLoading, error, entities};
}

export default useGetScenarios;