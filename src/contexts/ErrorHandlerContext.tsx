/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import ResponseMessageType from "../types/ResponseMessageType";

export interface ErrorHandlerContextType {
    error : ResponseMessageType | null;
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

export const ErrorHandlerContext = createContext<ErrorHandlerContextType>({
	error : null,
	setError : () => {}
});

export const ErrorHandlerProvider: FC = ({children}) => {
	const [error, setError] = useState<ResponseMessageType | null>(null);

	return (
		<ErrorHandlerContext.Provider value={{error, setError}}>
			{children}
		</ErrorHandlerContext.Provider>
	);

};