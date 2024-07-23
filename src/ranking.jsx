
import React, { useEffect } from 'react';
import { MiniCard } from './miniCard';

import 'animate.css';
import { useState } from 'react';

   






export const Ranking = ({personajes,setPersonajes,lastAddedId, imagen,setImagen}) => {

  


 


  /*

  useEffect(() => {
    if (personajes.length > 0) {
      // Establece el ID del último personaje agregado
      setLastAddedId(personajes[personajes.length - 1].id);
    }
    console.log("el ultimo id agregado es: "+lastAddedId)
  }, [personajes]);
*/
console.log("ultimo id en el componente ranking "+lastAddedId)
  
  return (
    <>
      <div className="container tablaRanking">
         {personajes.map((pj)=>(<MiniCard personajes={personajes} setPersonajes={setPersonajes} key={pj.id} id={pj.id} nombre={pj.nombre} dominio={pj.dominio} imagen={pj.imagen} setImagen={setImagen} ken={pj.ken} conviccion={pj.conviccion} focus={lastAddedId}></MiniCard>))}
      </div>
    </>
  )
}


