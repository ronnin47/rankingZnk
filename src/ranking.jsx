
import React, { useEffect, useState } from 'react';
import { MiniCard } from './miniCard';
import 'animate.css';


   


export const Ranking = ({personajes,setPersonajes,lastAddedId,imagenBase, setImagenBase}) => {

//console.log("ultimo id en el componente ranking "+lastAddedId)
  





  return (
    <>
      <div className="container tablaRanking">
         {personajes.map((pj, index)=>(<MiniCard imagenBase={imagenBase} setImagenBase={setImagenBase} rank={index+1} personajes={personajes} setPersonajes={setPersonajes} key={pj.idpersonaje} idpersonaje={pj.idpersonaje} nombre={pj.nombre} dominio={pj.dominio} imagen={pj.imagen}  ken={pj.ken} conviccion={pj.conviccion} focus={lastAddedId}></MiniCard>))}
      </div>
    </>
  )
}


