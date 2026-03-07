import express from 'express'
import { registerUser, loginUser, getUserInfo} from '../controllers/authcontrollers.js'
import {protect} from '../middleware/authmiddleware.js'

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getuser",protect ,getUserInfo);
 
export default router