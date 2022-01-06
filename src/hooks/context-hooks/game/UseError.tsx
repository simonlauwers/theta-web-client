import { useContext } from "react";
import { ErrorContext, ErrorContextType } from "../../../contexts/game/ErrorContext";

export default function useError(): ErrorContextType {
	return useContext(ErrorContext);
}
