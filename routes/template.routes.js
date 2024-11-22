import express, { Router } from 'express';
import { verifyAccessToken } from "../middlewares/verifyToken.middleware.js";
import { createTemplate, getUserDetails } from '../controllers/template.controller.js';

const templateRoutes = Router();

templateRoutes.post('/create',verifyAccessToken,createTemplate);
templateRoutes.get('/getDetails',verifyAccessToken,getUserDetails);

export default templateRoutes;


