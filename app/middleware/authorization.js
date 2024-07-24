
import jsonwebtoken from 'jsonwebtoken';
import {methods as authentication} from '../controllers/authentication.controller.js';

async function isAdmin(req, res, next) {
    const isLogged = await checkCookie(req);
    if(isLogged) return next();
    return res.redirect("/");
}

async function isPublic(req,res,next){
    const isLogged = await checkCookie(req);
    if(!isLogged) return next();
    return res.redirect("/admin");
}

async function checkCookie(req) {
    try {
        // Verifica si hay cookies en la solicitud
        if (!req.headers.cookie) return false;

        // Divide las cookies y encuentra la que comienza con "jwt="
        const cookies = req.headers.cookie.split("; ");
        const jwtCookie = cookies.find(cookie => cookie.startsWith("jwt="));
        if (!jwtCookie) return false;

        // Obtén el valor del token JWT de la cookie
        const token = jwtCookie.split("=")[1];

        // Verifica y decodifica el token JWT
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        // Verifica si el token está en vigor
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) return false;

        // Verifica la información contextual adicional
        if (decoded.ip !== req.ip || decoded.userAgent !== req.headers['user-agent']) return false;

        // Verifica si el usuario existe dentro de la base de datos
        const existUser = await authentication.isUserCheck(decoded.user);
        
        if(existUser){
            // Almacena la información del usuario en la solicitud
            req.user = decoded;
        }

        return existUser;

    } catch (error) {
        return false;
    }
}

async function cleanCookie(req, res){
    res.clearCookie('jwt', {
        path: '/',
        httpOnly: true,
        sameSite: 'Strict',
        // secure: process.env.NODE_ENV === 'production', // Si la cookie fue configurada con `secure`
    });
    res.status(200).send({ status: 'ok', message: 'Sesión cerrada' });
}




export const methods ={
    isAdmin,
    isPublic,
    cleanCookie
}

