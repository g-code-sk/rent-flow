import type { NextFunction, Request, Response } from "express";
import { sendOk } from "./apiResponse.js";

export function rejectHoneypot(req: Request, res: Response, next: NextFunction) {
   if (typeof req.body?.website === "string" && req.body.website.length > 0) {
      sendOk(res, null, 201);
      return;
   }

   next();
}
