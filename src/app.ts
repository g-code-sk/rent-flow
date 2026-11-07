import express from "express";
import { sendError, sendOk } from "./http/apiResponse.js";
import { engagementRouter } from "./routes/engagementRoutes.js";

export function createApp() {
   const app = express();

   app.set("trust proxy", 1);
   app.use(express.json({ limit: "32kb" }));
   app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      if (req.method === "OPTIONS") {
         res.status(204).end();
         return;
      }
      next();
   });

   app.get("/health", (_req, res) => {
      sendOk(res, { status: "ok" });
   });

   app.get("/api/health", (_req, res) => {
      sendOk(res, { status: "ok" });
   });

   app.use("/api", engagementRouter);

   app.use((_req, res) => {
      sendError(res, 404, "not_found", "Nenájdené.");
   });

   app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error(error);
      sendError(res, 500, "internal_error", "Niečo sa pokazilo.");
   });

   return app;
}
