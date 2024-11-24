import express, { Router } from 'express';
import { verifyAccessToken } from "../middlewares/verifyToken.middleware.js";
import { createTemplate, getUserDetails, updateTemplate } from '../controllers/template.controller.js';

const templateRoutes = Router();

templateRoutes.post('/create',verifyAccessToken,createTemplate);
templateRoutes.get('/getDetails',verifyAccessToken,getUserDetails);
templateRoutes.put('/updateTemplate',verifyAccessToken,updateTemplate);

export default templateRoutes;


