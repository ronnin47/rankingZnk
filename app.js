import express from 'express';
import http from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from 'pg'; 
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg; 

// Obtiene la ruta del directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors()); 


// Configura el límite del tamaño del cuerpo de la solicitud
app.use(bodyParser.json({ limit: '50mb' }));  // Aumenta el límite a 50 MB para JSON
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Aumenta el límite a 50 MB para URL-encoded

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(join(__dirname, 'dist')));

const server = http.createServer(app);


//LOCAL HOST
/*
// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',          // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'znkrankingbbbdd', // Reemplaza con el nombre de tu base de datos
  password: 'hikonometaiseno',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});
*/

//CONFIGURACION A LA BASE DE DATOS POSTGRESQL EN RENDER 
const pool = new Pool({
  user: 'basecode_user',          // Reemplaza con tu usuario de PostgreSQL
  host: 'dpg-cqp75jrqf0us73e54ik0-a',
  database: 'basecode', // Reemplaza con el nombre de tu base de datos
  password: 'uLxUA7IgbbJsLdpI4XO131i0FU4ts6yx',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});

/*
// Verificar conexión a la base de datos
async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()'); // Realiza una consulta simple para verificar la conexión
    console.log('Conexión a la base de datos PostgreSQL exitosa.');
  } catch (err) {
    console.error('Error al conectar a la base de datos PostgreSQL:', err.message);
    process.exit(1); // Salir del proceso con un código de error
  }
}
*/


async function checkDatabaseConnection() {
  try {
    // Verifica la conexión a la base de datos
    await pool.query('SELECT NOW()');
    console.log('Conexión a la base de datos PostgreSQL exitosa.');

    // Realiza una consulta adicional para verificar que puedes obtener datos
    const result = await pool.query('SELECT * FROM personajes LIMIT 1');
    if (result.rows.length > 0) {
      console.log('Consulta a la tabla personajes exitosa. Datos obtenidos:');
      console.log(result.rows); // Imprime una muestra de los datos obtenidos
    } else {
      console.log('La tabla personajes está vacía.');
    }
  } catch (err) {
    console.error('Error al conectar a la base de datos PostgreSQL o al realizar la consulta:', err.message);
    process.exit(1); // Salir del proceso con un código de error
  }
}
// Llama a la función de verificación de conexión al iniciar el servidor
checkDatabaseConnection();

app.use(express.json());




//CONSULTAS A LA BBDD
//GET ok!!
app.get('/personajes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM personajes');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los personajes:', err.message);
    res.status(500).json({ error: 'Error al obtener los personajes.Esto es la respuesta del servidor!!' });
  }
});

// INSERT ok!!
app.post('/insert-personaje', async (req, res) => {
  const { nombre, dominio, ken, conviccion, imagen } = req.body;
    console.log("llego la peticion de insert!!")
    console.log(req.body)
    // Convierte la imagen de base64 a un buffer
    const imagenBuffer = Buffer.from(imagen, 'base64');

  try {
    const query = `
      INSERT INTO personajes (nombre, dominio, ken, conviccion, imagen)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING idpersonaje
    `;

    const values = [nombre, dominio, ken, conviccion, imagenBuffer];
    const result = await pool.query(query, values);

    const newId = result.rows[0].idpersonaje;
    console.log("El Id que viene de la base de datos es: "+newId)
    res.status(201).json({ message: 'Personaje insertado exitosamente.', idpersonaje: newId });
  } catch (err) {
    console.error('Error al insertar el personaje:', err.message);
    res.status(500).json({ error: 'Error al insertar el personaje.' });
  }
});

//UPDATE ok!!
app.put('/update-personaje', async (req, res) => {
  const { idpersonaje, nombre, dominio, ken, conviccion, imagen } = req.body;

  //console.log("esto viene del req",req.body)
   // Convierte la imagen de base64 a un buffer
   const imagenBuffer = Buffer.from(imagen, 'base64');
  try {
    // Consulta para actualizar el personaje en la base de datos
    const result = await pool.query(
      `UPDATE personajes
       SET nombre = $1, dominio = $2, ken = $3, conviccion = $4, imagen = $5
       WHERE idpersonaje = $6`,
      [nombre, dominio, ken, conviccion, imagenBuffer, idpersonaje]
    );

    // Verifica si se actualizó algún registro
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Personaje actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Personaje no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el personaje:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



//const PORT = process.env.PORT || 4000;



//const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server levantado en el puerto http://localhost:${PORT}`);
});

// Ruta para manejar todas las solicitudes y devolver el archivo HTML principal
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});



// Manejar el cierre del servidor
process.on('SIGTERM', async () => {
  console.log('Recibiendo señal de terminación. Cerrando la conexión a la base de datos...');
  await pool.end(); // Cierra la conexión a la base de datos
  console.log('Conexión a la base de datos cerrada.');
  process.exit(0);
});
