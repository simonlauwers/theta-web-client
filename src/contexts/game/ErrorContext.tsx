/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import ResponseMessageType from "../../types/ResponseMessageType";

export interface ErrorContextType {
    error : ResponseMessageType | null;
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

export const ErrorContext = createContext<ErrorContextType>({
	error : null,
	setError : () => {}
});

export const ErrorProvider: FC = ({children}) => {
	const [error, setError] = useState<ResponseMessageType | null>(null);

	return (
		<ErrorContext.Provider value={{error, setError}}>
			{children}
		</ErrorContext.Provider>
	);

};