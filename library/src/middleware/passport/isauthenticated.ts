import {Request, Response, NextFunction} from 'express';


export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect('/users/login');
  }
  next();
};

