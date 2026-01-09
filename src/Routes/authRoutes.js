import express from 'express';
import { regsiterController } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', regsiterController)


export default router;