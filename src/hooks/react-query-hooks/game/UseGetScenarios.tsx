import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ScenarioType from "../../../types/ScenarioType";
import fetchData from "../../../utils/data/FetchData";

const useGetScenarios = () => {
	const { data, isSuccess, isError, isLoading, refetch } = useQuery(["scenarios"], () => fetchData("map/allScenarios"));
	const [scenarios, setScenarios] = useState<ScenarioType[]>([]);

	useEffect(() => {
		if (!isError && !isLoading) {
			setScenarios(data as unknown as ScenarioType[]);
		}
	}, [data, isError, isLoading]);
	return { scenarios, isSuccess, isError, isLoading, refetch };
};

export default useGetScenarios;