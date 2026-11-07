import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { sendError } from "./apiResponse.js";

export function validate(schema: ZodType) {
   return (req: Request, res: Response, next: NextFunction) => {
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
         sendError(res, 400, "invalid_request", "Neplatné údaje.", parsed.error.flatten());
         return;
      }

      req.body = parsed.data;
      next();
   };
}
