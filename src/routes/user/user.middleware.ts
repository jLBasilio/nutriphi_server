import { NextFunction, Request, Response } from "express";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (typeof(req.session.user) === "undefined") {
      return next();
    } else {
      const data = {
        status: 403,
        message: "Already logged in"
      };
      return res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
};
