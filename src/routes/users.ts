// src/routes/users.ts
import express, { Request, Response } from 'express';
import { User } from '../app/models/user.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req: Request, res: Response, next) => {

  try {
    const body = req.body;
    // throw 'ERROR BRIGIDO'
    const user = await User.create(body);
    res.json({
      user,
      success: true
    });

  } catch (error) {
    next(error);
  }
});



export default router;