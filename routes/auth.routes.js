import express, { Router } from 'express';
import { isUserNameExists, Login, Registration } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/register',Registration);
authRoutes.post('/login',Login);
authRoutes.get('/isExists',isUserNameExists);

export default authRoutes;