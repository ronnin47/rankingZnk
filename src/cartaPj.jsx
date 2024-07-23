import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

export const CartaPj = ({ onClose, id, imagen, nombre,dominio,ken, personajes,conviccion, setPersonajes }) => {


const informacionPj=`${nombre}  ${dominio}        KEN:${ken}`

  const [info,setInfo]=useState(informacionPj)
  
  
  
  const [nombreCartaPj,setNombreCartaPj]=useState(nombre)
  const handleChangeNombre=(event)=>{
  setNombreCartaPj(event.target.value)
  }
  
  const [dominioCartaPj,setDominioCartaPj]=useState(dominio)
  const handleChangeDominio=(event)=>{
  setDominioCartaPj(event.target.value)
  }
  const [kenCartaPj,setKenCartaPj]=useState(ken)
  const handleChangeKen=(event)=>{
  setKenCartaPj(event.target.value)
  }

  const [conviccionCartaPj,setConviccionCartaPj]=useState(conviccion)
  const handleChangeConviccion=(event)=>{
  setConviccionCartaPj(event.target.value)
  }


  const guardarCambiosPj=()=>{
    console.log("funciona boton guardar cambios Pj")
    console.log(id)
/*
     const newPersonaje={
        id: id,
        nombre: nombreCartaPj,
        dominio: dominioCartaPj,
        ken: kenCartaPj || 0,
        imagen: imagen,

     }
*/

        const newPersonaje={
          id: id,
          nombre: nombreCartaPj,
          dominio: dominioCartaPj,
          ken: kenCartaPj || 0,
          conviccion: conviccionCartaPj || "",
          imagen: imagen,
        }


       const updatedPersonajes = personajes.map((pj) => {
        if (pj.id === id) {
          console.log("personaje encontrado");
          return newPersonaje; // Reemplazar el personaje encontrado con newPersonaje
        }
        return pj; // Retornar el personaje sin cambios
      });

       
    
      setPersonajes(updatedPersonajes);

    onClose()
  }


  return (
    <Modal show={true} onHide={onClose}>

      <Modal.Header closeButton style={{backgroundColor:"black", color:"aliceblue"}}>
        <Modal.Title>
          <p style={{textAlign:"center", fontFamily:"cursive"}}>{nombre}</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className='modalCartaPjBody' style={{backgroundColor:"black", color:"aliceblue"}}>
      <Card.Img
            variant="top"
            src={imagen}
            style={{ maxWidth: "100%", maxHeight: "100%"}}
            className='imagenCartaPj'
          />

         <div className='inputCartaPj' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <input type="text" placeholder='Nombre' value={nombreCartaPj} onChange={handleChangeNombre} />
          <input type="text" placeholder='Dominio' value={dominioCartaPj} onChange={handleChangeDominio}  />
          <input type="number" placeholder='Ken' value={kenCartaPj} onChange={handleChangeKen} />
          <input type="text" placeholder='Conviccion' value={conviccionCartaPj} onChange={handleChangeConviccion} style={{width:"100%"}} />
         </div>
        


      </Modal.Body>
      
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}>
        <Button variant="outline-danger" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="outline-success" onClick={guardarCambiosPj}>
          Guardar
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};


