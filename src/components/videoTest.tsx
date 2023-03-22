import ZoomMtgEmbedded, { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/global.context";
import { generateSignature } from "../services/auth.service";

let client: typeof EmbeddedClient;

const VideoTest = () => {
	const videoRef = useRef<HTMLDivElement>(null);
	const { token } = useContext(GlobalContext);
	// const [_token, _setToken] = useState("");

	let stream;

	// useEffect(() => {
	// 	if (token) _setToken(token);
	// }, [token]);

	useEffect(() => {
		if (!videoRef.current) return;
		client = ZoomMtgEmbedded.createClient();
		client.init({ zoomAppRoot: videoRef.current, language: "en-US" });
	}, [videoRef]);

	const handleCallStart = () => {
		// get password from user
		const userName = "gaurav";
		const meetingNumber = "1234";
		try {
			const signature = generateSignature(process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID as string, meetingNumber, 1);
			console.log(signature);
			client.join({
				sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID as string,
				signature,
				meetingNumber,
				userName,
				zak: token,
			});

			// client.join(topic, token, userName, password).then(() => {
			// 	stream = client.getMediaStream();
			// });
			console.log(token);
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div ref={videoRef}>
			<button type="button" onClick={handleCallStart}>
				start call
			</button>
		</div>
	);
};

export default VideoTest;
