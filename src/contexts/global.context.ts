import { createContext } from "react";

interface IContext {
	token: string;
	setToken: (k: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const GlobalContext = createContext<IContext>({ token: "", setToken: () => {} });
