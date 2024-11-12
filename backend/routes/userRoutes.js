import express from 'express';
import * as serv from '../controllers/userController.js';

export const router = express.Router();

router.post("/gen-url", serv.generateQr);

router.post("/verify-access/:formId", serv.checkAccess)