
import { Nava } from "./nava.jsx";
import { CargarPj} from "./cargarPj.jsx";
import { Ranking } from "./ranking.jsx";
import { useState, useEffect } from "react";



export const App=()=> {

   //rcupera del local los personajes o pone una rray vacio
   const [personajes, setPersonajes] = useState(() => {
    const localPersonajes = localStorage.getItem('personajes');
    return localPersonajes ? JSON.parse(localPersonajes) : [];
  });
  
//cada vez que persoanjes tiene un cambio lo guarda en storage
 useEffect(()=>{
  console.log(personajes)
  localStorage.setItem("personajes",JSON.stringify(personajes))
 },[personajes])

 const [lastAddedId, setLastAddedId] = useState(null);


 const sortedPersonajes = personajes.sort((a, b) => b.ken - a.ken);

  return (
    <>
     <Nava tituloNav={" Ranking ZNK"}></Nava>
     <CargarPj personajes={personajes} setPersonajes={setPersonajes} lastAddedId={lastAddedId} setLastAddedId={setLastAddedId}></CargarPj>
     <Ranking personajes={sortedPersonajes} setPersonajes={setPersonajes}lastAddedId={lastAddedId}></Ranking>
    </>
  )
}


