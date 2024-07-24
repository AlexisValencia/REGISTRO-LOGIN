import { Router } from "express";
import {methods as authentication} from '../controllers/authentication.controller.js'
import { methods as authorization } from "../middleware/authorization.js";

const router = Router(); //Inicializacion del Router

//POST REGISTER
router.post('/register', authorization.isPublic, authentication.register);

//POST LOGIN
router.post("/login", authorization.isPublic, authentication.login)

//POST LOGOUT
router.post("/logout", authorization.isAdmin, authorization.cleanCookie)

export default router;