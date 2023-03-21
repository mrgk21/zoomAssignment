import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import { GlobalContext } from "../../contexts/global.context";

const Testing = () => {
	const [cookie, setCookie] = useCookies(["token"]);
	const { token, setToken } = useContext(GlobalContext);
	useSWR("/api/auth", (apiURL: string) => fetch(apiURL).then((res) => res.json()));

	useEffect(() => {
		if (cookie.token) setToken(cookie.token);
	}, [cookie]);

	console.log(cookie.token);

	return <div>testing things out</div>;
};

export default Testing;
