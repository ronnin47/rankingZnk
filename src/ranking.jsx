
import React from 'react';
import { MiniCard } from './miniCard';

import 'animate.css';
import { useState } from 'react';

   






export const Ranking = ({personajes,setPersonajes}) => {

  console.log(personajes)

  const sortedPersonajes = personajes.sort((a, b) => b.ken - a.ken);

  setPersonajes(sortedPersonajes);

  
  return (
    <>
      <div className="container tablaRanking">
         {personajes.map((pj)=>(<MiniCard personajes={personajes} key={pj.id} id={pj.id} nombre={pj.nombre} dominio={pj.dominio} imagen={pj.imagen} ken={pj.ken}></MiniCard>))}
      </div>
    </>
  )
}


