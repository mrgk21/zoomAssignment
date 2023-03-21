import ZoomVideo, { Stream, VideoClient } from "@zoom/videosdk";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateSignature } from "../services/auth.service";

let client: typeof VideoClient;

const VideoTest = () => {
	let stream: typeof Stream;

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [videoView, setVideoView] = useState(false);

	useEffect(() => {
		client = ZoomVideo.createClient();
		client.init("en-US", "CDN");
	}, []);

	const handleCallStart = () => {
		// get password from user
		const password = "1234";
		const userName = "gaurav";
		const topic = "sessionName1234";
		const sessionKey = uuidv4();
		try {
			// session key can be stored in global context

			const token = generateSignature(
				process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID as string,
				process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET as string,
				topic,
				1,
				sessionKey,
				userName,
				password,
			);
			console.log(token);

			client.join(topic, token, userName, password).then(() => {
				stream = client.getMediaStream();
			});
			console.log(token, sessionKey);
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleJoinCall = () => {
		// client
		// 	.join(topic, token, userName, password)
		// 	.then(() => {
		// 		stream = client.getMediaStream();
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	};

	const handleStartVideo = () => {
		if (!stream) return;
		if (stream.isRenderSelfViewWithVideoElement()) {
			setVideoView(true);
			// start video - video will render automatically on HTML Video element
			if (!videoRef.current) return;
			stream
				.startVideo({ videoElement: videoRef.current })
				.then(() => {
					// show HTML Video element in DOM
					if (videoRef.current) videoRef.current.style.display = "block";
				})
				.catch((error) => {
					console.log(error);
				});
			// desktop Chrome, Edge, and Firefox with SharedArrayBuffer enabled, and all other browsers
		} else {
			// start video
			if (!canvasRef.current) return;
			stream
				.startVideo()
				.then(() => {
					// render video on HTML Canvas element
					stream
						.renderVideo(canvasRef.current!, client.getCurrentUserInfo().userId, 1280, 720, 0, 0, 2)
						.then(() => {
							// show HTML Canvas element in DOM
							if (canvasRef.current) canvasRef.current.style.display = "block";
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div>
			<button type="button" onClick={handleCallStart}>
				start call
			</button>
			{/* <button type="button" onClick={handleJoinCall}>
				join call
			</button>
			<button type="button" onClick={handleStartVideo}>
				start video
			</button>
			<button type="button" onClick={() => stream.stopVideo()}>
				stop video
			</button> */}

			{videoView ? (
				<video ref={videoRef} width={1280} height={720} />
			) : (
				<canvas ref={canvasRef} width={1280} height={720} />
			)}
		</div>
	);
};

export default VideoTest;
