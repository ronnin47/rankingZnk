import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export const CartaPj = ({ onClose, idpersonaje, imageSrc,setImageSrc, setImagenBase, nombre,dominio,ken, personajes,conviccion, setPersonajes }) => {


  const imgCartaPjRef = useRef(null);

  const [newImagen,setNewImagen]=useState(imageSrc)
  
  
  
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
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update-personaje`, newPersonaje, { 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      try {
        //const response = await axios.get('http://localhost:4000/personajes');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/personajes`);
        setPersonajes(response.data);
        console.log("PERSOANJES RECUPERADOS TRAS GUARDAR")
      
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
      }
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
      // Opcional: Cerrar el modal o realizar cualquier otra acción necesaria
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

const cerrar=()=>{
  console.log("paso por aca")
  setFade(true) 
  setTimeout(() => {

    setFade(false); 
    onClose()
  }, 700);
}


  return (
    <Modal show={true} onHide={cerrar}>
       
       <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
       <Modal.Header closeButton style={{backgroundColor:"black", color:"aliceblue"}}>
        <Modal.Title>
          <p style={{textAlign:"center", fontFamily:"cursive"}}>{nombre}</p>
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
          <input type="text" placeholder='Conviccion' value={conviccionCartaPj} onChange={handleChangeConviccion} style={{width:"100%"}} />
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
  );
};


