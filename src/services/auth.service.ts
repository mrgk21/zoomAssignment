import KJUR from "jsrsasign";

// export function generateToken(
// 	chatName: string,
// 	userName: string,
// 	password = "",
// ): { token: string; sessionKey: string } {
// 	if (password.length > 10) throw new Error("password cannot be more than 10 chars");
// 	if (chatName.length > 200) throw new Error("chat name cannot be more than 200 chars");
// 	if (chatName.length === 0) throw new Error("chat name cannot be empty");

// 	const sessionKey = uuidv4();
// 	const jwtObj = {
// 		app_key: `${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}`,
// 		tpc: chatName,
// 		version: 1,
// 		role_type: "", // user or host
// 		user_identity: userName,
// 		session_key: sessionKey,
// 		geo_regions: "IN",
// 		iat: Date.now(),
// 		exp: Date.now() + 48 * 60 * 60,
// 	};
// 	const sign1 = jwt.sign("12345", "1234");
// 	console.log(sign1);

// 	if (password.length === 0) {
// 		return { token: "1234", sessionKey };
// 	}
// 	return {
// 		token: jwt.sign({ ...jwtObj, pwd: password }, `${process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET}`),
// 		sessionKey,
// 	};
// }

// https://www.npmjs.com/package/jsrsasign

export function generateSignature(
	sdkKey: string,
	sdkSecret: string,
	sessionName: string,
	role: number,
	sessionKey: string,
	userIdentity: string,
	password: string,
) {
	const iat = Math.round(new Date().getTime() / 1000) - 30;
	const exp = iat + 60 * 60 * 48; // max limit of 48 hour exp
	const oHeader = { alg: "HS256", typ: "JWT" };

	const oPayload = {
		app_key: sdkKey,
		tpc: sessionName,
		role_type: role,
		session_key: sessionKey,
		user_identity: userIdentity,
		version: 1,
		iat: iat,
		exp: exp,
		password,
	};

	const sHeader = JSON.stringify(oHeader);
	const sPayload = JSON.stringify(oPayload);

	// @ts-ignore
	const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
	return sdkJWT;
}
