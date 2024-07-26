
import { Nava } from "./nava.jsx";
import { CargarPj} from "./cargarPj.jsx";
import { Ranking } from "./ranking.jsx";
import { useState, useEffect } from "react";
import { Probandolo } from "./probandolo.jsx";
//es para los metodos http
import axios from 'axios';

export const App=()=> {


//viene con imagen base y es solo un fondis
const [imagenBase,setImagenBase]=useState("/imagenBase.jpeg")
const [personajes, setPersonajes] = useState([])


//al cargar consume manda la peticion al servidor y lo setea en el state personajes
useEffect(() => {
  const fetchPersonajes = async () => {
    try {
      //const response = await axios.get('http://localhost:4000/personajes');
      const url = `${process.env.REACT_APP_BACKEND_URL}/personajes`;
      console.log(`Fetching from: ${url}`);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/personajes`);
      console.log(`Entro en el tray y trajo: ${response.data}`)
      setPersonajes(response.data);
    
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
    }
  };

  fetchPersonajes();
}, []);

//**********CUANDO CARGA SOBRE PERSONAJES VA A CONSUMIR DE LA BASE************

//lo use para solucionar algo y lo dejo aca para mantener esa logica visual
 const [lastAddedId, setLastAddedId] = useState(null);


 //realiza el sort por KEN 
 const sortedPersonajes = personajes.length > 0 ? [...personajes].sort((a, b) => b.ken - a.ken) : [];


  return (
    <>
     <Nava tituloNav={" Ranking ZNK"}></Nava>
     <CargarPj personajes={personajes} setPersonajes={setPersonajes} imagenBase={imagenBase} setImagenBase={setImagenBase} lastAddedId={lastAddedId} setLastAddedId={setLastAddedId} ></CargarPj>
     <Ranking personajes={sortedPersonajes} setPersonajes={setPersonajes} lastAddedId={lastAddedId} imagenBase={imagenBase} setImagenBase={setImagenBase}></Ranking>
     <Probandolo></Probandolo>
    </>
  )
}


