import bcryptjs from "bcryptjs";
import conn from '../database.js';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/** CONTROL DEL LOGUEO */
async function login(req, res) {
  try {
    if (!req.body || req.body.length < 1) return res.status(401).json({ message: "Faltan datos para iniciar sesión" });
    const { user, password } = req.body;
    if (!user || !password || password.length < 3 || user.length < 4) return res.status(401).json({ message:  "Faltan datos para iniciar sesión"});
    const isUser = await isUserCheck(user);
    if( !isUser ) return res.status(401).json({ message: "El usuario no existe." });
    const [row] = await conn.execute("SELECT password from usuarios WHERE LOWER(name) = LOWER(?)", [user]);
    const hashPassword = row[0].password;
    const getCompareHashPassword = await bcryptjs.compare(password, hashPassword);//Comparación del password en BD (cifrado) con el pasado por formulario
    if(!getCompareHashPassword) return res.status(401).send({message:"Datos incorrectos"});
    const createJsonWebToken = await generateJsonWebToken(req, user); 
    const{token, cookieOption} = createJsonWebToken;
    res.cookie("jwt", token, cookieOption); //El nombre de la cookie: jwt, valor:token, opciones:cookieOption
    res.status(200).send({status:"ok", message:"Iniciando sesión", redirect:"/admin"});
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**CONTROL DEL REGISTRO */
async function register(req, res) {
  try {
    if (!req.body || req.body.length < 1) return res.status(401).json({ message: "Faltan datos para el registro" });
    const { user, password, email } = req.body;
    if (!user || !password || !email || password.length < 3 || user.length < 4) return res.status(401).json({ message: "Compruebe los datos del registro." });
    const isUser = await isUserCheck(user);
    if( isUser ) return res.status(401).json({ message: "El usuario ya está registrado." });
    const salt = await bcryptjs.genSalt(5);//CREACION DE LA ENCRIPTACION DE LA CLAVE
    const hashPassword = await bcryptjs.hash(password, salt); //Constraseña que sera guardada en la BD
    await conn.execute("INSERT INTO usuarios (name,email,password ) VALUES (?,?,?)",[user, email, hashPassword]);
    res.status(200).send({status:"ok", message:"Usuario añadido", redirect:"/"});
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}


/**CONTROL DE LA EXISTENCIA DEL USUARIO */
async function isUserCheck(user) {
  try {
    // Realiza la consulta utilizando `execute` para una consulta preparada
    const [rows] = await conn.execute("SELECT COUNT(id) as count FROM usuarios WHERE LOWER(name) = LOWER(?)", [user]);
    // Obtiene el conteo de la primera fila de la respuesta
    const count = rows[0].count;
    // Retorna true si el usuario existe, de lo contrario false
    return count > 0;
  } catch (error) {
    return false;
  }
}


// CREA JSONWEBTOKEN SEGURO
async function generateJsonWebToken (req, user){
  // Información contextual adicional
  const payload = {
      user, //Nombre del usuario
      ip: req.ip, // Almacenar la IP del cliente
      userAgent: req.headers['user-agent'] // Almacenar el User-Agent del cliente
  };

  const token = jsonwebtoken.sign(
      payload, 
      process.env.JWT_SECRET, 
      { 
          expiresIn: process.env.JWT_EXPIRATION, 
          algorithm: 'HS256' // Usar algoritmo seguro
      }
  );

  const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true, // Asegura que la cookie no sea accesible mediante JavaScript
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Previene ataques CSRF
      path: "/"
  };

  return { token, cookieOption };
}

export const methods = { login, register, isUserCheck };