import {Request, Response} from 'express';


const error = (req: Request, res: Response): void => {
  res.render('error/404', {
    title: '404 | страница не найдена',
  });
};

export = error;
