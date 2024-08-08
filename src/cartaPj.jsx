import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Estrellitas } from './estrellitas.jsx'

import 'animate.css';

export const CartaPj = ({ onClose, idpersonaje, imageSrc,setImageSrc, setImagenBase, nombreN,setNombreN,dominioN,setDominioN,kenN,setKenN, personajes,conviccionN,setConviccionN, setPersonajes,actualizarPersonajes }) => {


  const imgCartaPjRef = useRef(null);

  const [newImagen,setNewImagen]=useState(imageSrc)
  const [nombreCartaPj,setNombreCartaPj]=useState(nombreN)
  const handleChangeNombre=(event)=>{
  setNombreCartaPj(event.target.value)
  }
  
  const [dominioCartaPj,setDominioCartaPj]=useState(dominioN)
  const handleChangeDominio=(event)=>{
  setDominioCartaPj(event.target.value)
  }
  const [kenCartaPj,setKenCartaPj]=useState(kenN)
  const handleChangeKen=(event)=>{
  setKenCartaPj(event.target.value)
  }

  const [conviccionCartaPj,setConviccionCartaPj]=useState(conviccionN)
  const handleChangeConviccion=(event)=>{
  setConviccionCartaPj(event.target.value)
  }

//acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  useEffect(()=>{
    //necesito que reordene personajes segun ken
    console.log("necesito sorted en personajes apra ordenar KEN+")
  },[kenN])

  const guardarCambiosPj = async () => {
    console.log("Funciona el botón guardar cambios Pj");
    console.log(idpersonaje);
  
    const newPersonaje = {
      idpersonaje: idpersonaje,
      nombre: nombreCartaPj,
      dominio: dominioCartaPj,
      ken: kenCartaPj || 0,
      conviccion: conviccionCartaPj || "",
      imagen: newImagen,
    };
  
    try {
      // Enviar la solicitud de actualización al servidor
      //await axios.put(`http://localhost:4000/update-personaje`, newPersonaje, { 
      await axios.put(`https://znkranking.onrender.com/update-personaje`, newPersonaje, { 
          
        headers: {
          'Content-Type': 'application/json',
        },
      });
      /*
      try {
        const response = await axios.get('http://localhost:4000/personajes');
        //const response = await axios.get(`https://znkranking.onrender.com/personajes`);
        setPersonajes(response.data);
        console.log("PERSOANJES RECUPERADOS TRAS GUARDAR")
      
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
      }
        */

  /*
  // Actualizar el estado local
      const updatedPersonajes = personajes.map((pj) => {
        if (pj.idpersonaje === idpersonaje) {
          console.log("Personaje encontrado");
          return newPersonaje; // Reemplazar el personaje encontrado con newPersonaje
        }
        return pj; // Retornar el personaje sin cambios
      });
      setPersonajes(updatedPersonajes);
     // setImageSrc(newImagen)
   
      console.log("Personaje actualizado en el estado local");
*/


      
actualizarPersonajes(idpersonaje, kenCartaPj);
     
      // Opcional: Cerrar el modal o realizar cualquier otra acción necesaria
      setNombreN(nombreCartaPj);
      setDominioN(dominioCartaPj);
      setKenN(kenCartaPj);
      setConviccionN(conviccionCartaPj)
      setImageSrc(newImagen)
    
   
   


     
      cerrar();
    } catch (error) {
      console.error('Error al actualizar el personaje:', error.message);
    }


  

  };



  //para la imagen
  const handleImageUpload = () => {
     imgCartaPjRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {     
      setNewImagen(reader.result); 
    };
    reader.readAsDataURL(file);
  };


const [fade,setFade]=useState(false)
const [animacion,setAnimacion]=useState("")
const cerrar=()=>{
  console.log("paso por aca")
  setFade(true)
  //setAnimacion("animate__animated animate__flipOutY");
  setTimeout(() => {
    //setAnimacion("");
    setFade(false); 
    onClose()
  }, 700);
}


  return (
    <div  >
      <Modal show={true} onHide={cerrar} className={`${animacion}`}>
       
       <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
       <Modal.Header closeButton style={{backgroundColor:"black", color:"aliceblue"}}>
        <Modal.Title>
          <div style={{display:"flex", flexDirection:"row", gap:"2em"}}>
          <p style={{textAlign:"center",fontSize:"1em",color:"Yellow", fontFamily:"cursive"}}>{nombreN}</p>
          <div className='estrellitas'>
          <Estrellitas ken={kenN}></Estrellitas>
          </div>

          </div>
          
          
         
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className='modalCartaPjBody' style={{backgroundColor:"black", color:"aliceblue"}}>
      <Card.Img
            variant="top"
            src={newImagen}
            style={{ maxWidth: "100%", maxHeight: "100%"}}
            className='imagenCartaPj'
          />

         <div className='inputCartaPj' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <input type="text" placeholder='Nombre' value={nombreCartaPj} onChange={handleChangeNombre} />
          <input type="text" placeholder='Dominio' value={dominioCartaPj} onChange={handleChangeDominio}  />
          <input type="number" placeholder='Ken' value={kenCartaPj} onChange={handleChangeKen} />
          <textarea  placeholder='Conviccion' value={conviccionCartaPj} onChange={handleChangeConviccion} style={{fontFamily:"cursive",width:"100%", backgroundColor:"black",color:"yellow",borderRadius:"5px",marginTop:"1em",padding:"5px",textAlign:"center"}} />
         </div>
        


      </Modal.Body>
      
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}>
      <Button variant="outline-info" onClick={handleImageUpload} >
          Cargar imagen
        </Button>
        <input type="file" accept="image/*" ref={imgCartaPjRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        <Button variant="outline-success" onClick={guardarCambiosPj}>
          Guardar
        </Button>
        
      </Modal.Footer>
        
       </div>
      
    </Modal>

    </div>
    
  );
};


