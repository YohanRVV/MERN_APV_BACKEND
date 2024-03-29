import express from "express"; //Cuando lo instalas via npm no necesitas la extensión (.js)
import dotenv from 'dotenv';
import conectarDB from "./config/db.js"; //Cuando la creas tú, si necesitas la extensión(.js)
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import cors from 'cors'

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor Funcionando en el Puerto ${PORT}`)
});