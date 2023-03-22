import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { GlobalContext } from "../contexts/global.context";
import "../global.css";

const App = ({ Component, pageProps }: AppProps) => {
	const [token, setToken] = useState("");
	const value = useMemo(() => ({ token, setToken }), [token]);

	return (
		<GlobalContext.Provider value={value}>
			<Component {...pageProps} />
		</GlobalContext.Provider>
	);
};

export default App;
