import { useQuery } from "react-query";
import ScenarioType from "../../../types/ScenarioType";
import fetchData from "../../../utils/data/FetchData";

const useGetScenarios = () => {
    const { data, isSuccess, isError, isLoading, refetch } = useQuery(['users'], () => fetchData('map/allScenarios'));
    let scenarios: ScenarioType[];
    try {
        scenarios = data as unknown as ScenarioType[];
    } catch (error) {
        scenarios = [];
    }

    return { scenarios, isSuccess, isError, isLoading, refetch };
}

export default useGetScenarios;