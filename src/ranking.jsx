
import React, { useEffect, useState } from 'react';
import { MiniCard } from './miniCard';
import 'animate.css';


   


export const Ranking = ({personajes,setPersonajes,lastAddedId,imagenBase, setImagenBase,actualizarPersonajes}) => {

//console.log("ultimo id en el componente ranking "+lastAddedId)
const [plus, setPlus] = useState("");

  // Utiliza useEffect para actualizar el estado basado en los personajes
  useEffect(() => {
    if (personajes.length > 0) {
      setPlus("plus");
    } else {
      setPlus(""); // Asegúrate de limpiar el estado si no hay personajes
    }
  }, [personajes]); // Ejecuta el efecto cuando 'personajes' cambie
  
  return (
    <>
 
      <div className={`container tablaRanking ${plus}`}>
        
         {personajes.map((pj, index)=>(<MiniCard imagenBase={imagenBase} setImagenBase={setImagenBase} rank={index+1} personajes={personajes} setPersonajes={setPersonajes} actualizarPersonajes={actualizarPersonajes} key={pj.idpersonaje} idpersonaje={pj.idpersonaje} nombre={pj.nombre} dominio={pj.dominio} imagen={pj.imagen}  ken={pj.ken} conviccion={pj.conviccion} focus={lastAddedId}></MiniCard>))}
      </div>
    </>
  )
}


