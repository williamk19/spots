import { rest } from "msw";
import { setupServer } from "msw/node";
import {data} from "./response";

export const server = setupServer(
    rest.get(
        `https://api.spotify.com/v1/search`,
        (req, res, ctx) => {
            const id = req.url.searchParams.get('id');
            const type = req.url.searchParams.get('type');
            console.log(id, type);
            return res(
                ctx.status(200),
                ctx.json(data)
            );
        }
    )
);