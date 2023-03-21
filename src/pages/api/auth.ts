import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
	if (req.method === "GET") {
		try {
			const token = await getToken(req.query.code as string);
			res.status(200);
			res.setHeader("set-cookie", `token=${token}; path=/; samesite=lax; `);
			res.redirect("http://localhost:3000/testing");
			return Promise.resolve();
		} catch (error) {
			console.log(error);
		}
	}
}

async function getToken(code: string): Promise<string | undefined> {
	const encoded = Buffer.from(
		`${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}:${process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET}`,
	).toString("base64");

	const body = {
		grant_type: "client_credentials", // to use authorization_code in the long run / temp -> client_
		code,
		redirect_uri: `http://localhost:3000/testing`,
	};

	const { data } = await axios.post("https://zoom.us/oauth/token", stringify(body), {
		headers: {
			Authorization: `Basic ${encoded}`,
			"Content-Type": "application/x-www-form-urlencoded",
			Accept: "application/json",
		},
	});
	return data.access_token as string;
}
