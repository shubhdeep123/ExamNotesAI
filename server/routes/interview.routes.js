import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { generateInterviewQuesAns } from '../controller/generate.controller.js';

const interviewRouter = express.Router();

interviewRouter.post("/generate",isAuth,generateInterviewQuesAns);

export default interviewRouter;