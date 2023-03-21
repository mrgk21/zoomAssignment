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
					href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=https://1210-2405-201-1005-38d5-59b0-1c47-cf54-a46a.in.ngrok.io/api/auth`}
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
