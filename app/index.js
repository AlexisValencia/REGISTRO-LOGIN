import express  from "express";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import backRoutes from './routes/back.routes.js'

/**INICIALIZACION*/
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)) // SE OBTIENE EL VALOR DE LA URL


/**CONFIGURACION */
app.set("port", process.env.SERVER_PORT || 4000); // SE ESTABLECE EL PUERTO DEL .env o por defecto el 4000


/**PARTIAL */

/**MIDDLEWARE */
app.use(morgan("dev"));//Escucha las peticiones
app.use(express.urlencoded({extended:false}));
app.use(express.json());//Permite realiar operaciones con JSON

/**RUTAS */
app.get("/", (req, res) => res.sendFile(join(__dirname, "/pages/login.html")));
app.get("/register", (req, res) => res.sendFile(join(__dirname, "/pages/register.html")));
app.get("/admin", (req, res) => res.sendFile(join(__dirname, "/pages/admin/admin.html")));

/**MANEJO DE RUTAS */
app.use('/api', backRoutes); // Usa el archivo de rutas para las peticiones a /api/productos




/**ARCHIVOS PUBLICOS */
app.use(express.static(join(__dirname, 'public')));


/**EJECUCION DEL SERVIDOR */
app.listen(app.get("port"), () => {
    console.log(`Server listening on PORT ${app.get("port")}`)
});