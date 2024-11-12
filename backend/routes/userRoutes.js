import express from 'express';
import * as serv from '../controllers/userController.js';

export const router = express.Router();

router.post("/save-url", serv.generateQr);

router.get("/get-url", serv.getUrl)