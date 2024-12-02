import express, { Router } from 'express';
import { verifyAccessToken } from "../middlewares/verifyToken.middleware.js";
import { createTemplate, getTemplates, getTemplatesPreview, getUserDetails, updateTemplate } from '../controllers/template.controller.js';

const templateRoutes = Router();

templateRoutes.post('/create',verifyAccessToken,createTemplate);
templateRoutes.get('/getDetails',verifyAccessToken,getUserDetails);
templateRoutes.put('/updateTemplate',verifyAccessToken,updateTemplate);
templateRoutes.get('/getTemplates',verifyAccessToken,getTemplates);
templateRoutes.get('/templatePreview',verifyAccessToken,getTemplatesPreview);

export default templateRoutes;


