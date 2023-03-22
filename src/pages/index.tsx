import axios from "axios";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/global.context";

const VideoTest = dynamic(() => import("../components/videoTest"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

interface ServerProps {
	token: string | null;
}

const Home = ({ token }: ServerProps) => {
	const { setToken } = useContext(GlobalContext);

	useEffect(() => {
		if (token) setToken(token);
	}, [token]);

	return (
		<div>
			<button type="button">Click to start the app</button>
			<VideoTest />
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<ServerProps> = async () => {
	let token = null;
	try {
		const { data } = await axios.get(
			`https://api.zoom.us/v2/users/${process.env.NEXT_PUBLIC_USER_ID}/token?type=zak`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZOOM_JWT}`,
				},
			},
		);
		token = data.token;
	} catch (error) {
		console.log(error);
	}
	return { props: { token } };
};
