import { rest } from "msw";
import { setupServer } from "msw/node";
import {data} from "./response";

export const server = setupServer(
    rest.get(
        `https://api.spotify.com/v1/search?q=eminem&type=track`,
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(data)
            );
        }
    )
);
