
import { Nava } from "./nava.jsx";
import { CargarPj} from "./cargarPj.jsx";
import { Ranking } from "./ranking.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { Loader } from './loader';

export const App=()=> {

//viene con imagen base y es solo un fondis
const [imagenBase,setImagenBase]=useState("/imagenBase.jpeg")
const [personajes, setPersonajes] = useState([]);


const [lastAddedId, setLastAddedId] = useState(null);



const fetchPersonajes = async () => {
  try {
    //en localhost
    //const response = await axios.get('http://localhost:4000/personajes');
    //esta es la que funciono en render
    const response = await axios.get('https://znkranking.onrender.com/personajes');
   setPersonajes(response.data);
   setLoading(false); // Carga completada
  
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    setLoading(false); // Carga completada
  }
};

//perosnajes sorted
const [sortedPersonajes, setSortedPersonajes] = useState([]);

useEffect(() => {
  fetchPersonajes();
}, []);

useEffect(() => {
  if (personajes.length > 0) {
    const sorted = [...personajes].sort((a, b) => b.ken - a.ken);
    setSortedPersonajes(sorted);
  }
}, [personajes]);



const actualizarPersonajes = (idpersonaje, nuevoKen) => {
  setPersonajes((prevPersonajes) => {
    const updatedPersonajes = prevPersonajes.map((pj) =>
      pj.idpersonaje === idpersonaje ? { ...pj, ken: nuevoKen } : pj
    );

    // Ordenar los personajes por `ken` en orden descendente
    return updatedPersonajes.sort((a, b) => b.ken - a.ken);
  });
};




 //const sortedPersonajes = personajes.length > 0 ? [...personajes].sort((a, b) => b.ken - a.ken) : [];
 //const [sortedPersonajs,setSortedPjs]=useState(sortedPersonajes)
 
//defaultActiveKey="0"

const [loading, setLoading] = useState(true); // Estado de carga

  return (
    <>
     <Nava tituloNav={" Ranking ZNK"}></Nava>
      {loading ? (
        <Loader /> // Mostrar el loader mientras se carga la información
      ) : ( <>
       
        <Accordion >
         <Accordion.Item eventKey="0">
           <Accordion.Header style={{fontFamily:"cursive"}}>Cargar nuevo personaje</Accordion.Header>
           <Accordion.Body style={{backgroundColor:"black"}}>
           <CargarPj personajes={personajes} setPersonajes={setPersonajes} imagenBase={imagenBase} setImagenBase={setImagenBase} lastAddedId={lastAddedId} setLastAddedId={setLastAddedId} ></CargarPj>
             
           </Accordion.Body>
         </Accordion.Item>
       </Accordion>
       <div >
       <Ranking personajes={sortedPersonajes} setPersonajes={setPersonajes} actualizarPersonajes={actualizarPersonajes} lastAddedId={lastAddedId} imagenBase={imagenBase} setImagenBase={setImagenBase}></Ranking>
       </div>
       </>)}
    </>
   
  )
}




