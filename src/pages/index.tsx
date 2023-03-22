import dynamic from "next/dynamic";
import Link from "next/link";

const VideoTest = dynamic(() => import("../components/videoTest"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

const Home = () => {
	return (
		<div>
			<button type="button">
				<Link
					href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/auth`}
					target="_blank"
				>
					Click to sign into zoom
				</Link>
			</button>
			<VideoTest />
		</div>
	);
};

export default Home;
