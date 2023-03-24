## Project Setup

### Tools

-   `Prettier` for consistent code styling
-   `Eslint` for solving linting issues and following set standards. Major packages used are `eslint-config-airbnb`, `eslint-config-prettier`, `@typescript-eslint`
-   `Typescript` for type checking
-   `Husky` for using git-hooks
-   `Commitlint` for consistent commit message format, integrated with husky
-   `Tailwind` as a styling library

## Project Progress

I went with using the zoom meeting SDK as it fit the use-case

### 1. Authentication

Instead of using a free SaaS solution, which might give errors during production, I decided to implement the OAuth using nextJS API router inside `/pages/api/auth.ts`. Instead of using a backend which would most probably have to be deployed using a seperate service as the frontend, I chose to use NextJSs inbuilt colocation for conveniently deploying a full stack on vercel.

Problems during dev:

-   localhost does not work with zoom oauth, so needed to use ngrok for exposing local app
-   Ran into `Invalid grant type` error while making `/oauth/token` POST request to the server for the access token. I followed the _user authentication_ part in the docs. Could not find a solution on the forums either. This seemed to be a refresh token error according to most posts.
-   Explored other Apps such as JWT and OAuth for possible solutions for generating an access token with meeting SDK. Ran into the same problem with the OAuth App.
-   JWT App worked with zoom API for generating my zoom account ZAK. The generated ZAK could not be used for starting meetings, giving the error `not support to start meeting via tokens`. The JWT code is in `jwt-auth` branch
