import type { AppType } from "../api/[[...route]]/route";
import { hc } from "hono/client";

export const client = hc<AppType>("http://localhost:3000/");
