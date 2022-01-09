import { useContext } from "react";
import { ErrorHandlerContextType, ErrorHandlerContext } from "../../contexts/ErrorHandlerContext";

export default function useErrorHandler(): ErrorHandlerContextType {
	return useContext(ErrorHandlerContext);
}
