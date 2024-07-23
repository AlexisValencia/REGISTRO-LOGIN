import { Router } from "express";
import {methods as authenticaton} from '../controllers/authentication.controller.js'

const router = Router(); //Inicializacion del Router

//POST REGISTER
router.post('/register', authenticaton.register);

//POST LOGIN
router.post("/login", authenticaton.login)

export default router;