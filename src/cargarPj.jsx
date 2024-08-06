
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
//import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';




export const CargarPj = ({personajes,setPersonajes,imagenBase, setImagenBase,lastAddedId,setLastAddedId}) => {


 const inputFileRef = useRef(null);






 //LOS 4 INPUTS QUE TIENE QUE CARGAR
 const [cargarNombre,setCargarNombre]=useState("");
  const handleInputNombre=(event)=>{
    setCargarNombre(event.target.value)
  }
  const [cargarConviccion,setCargarConviccion]=useState("");
  const handleInputConviccion=(event)=>{
    setCargarConviccion(event.target.value)
  }
  const [cargarDominio,setCargarDominio]=useState("");
  const handleInputDominio=(event)=>{
    setCargarDominio(event.target.value)
  }
  const [cargarKen,setCargarKen]=useState("");
  const handleInputKen=(event)=>{
    setCargarKen(event.target.value)
  }






//PETICION DE INSERT AL SERVIDOR 
const cargarPersonaje = async () => {
  const newPersonaje = {
    nombre: cargarNombre,
    dominio: cargarDominio,
    ken: cargarKen || 0,
    conviccion: cargarConviccion || "",
    imagen: imagenBase,
  };


  
  try {
    
    //const response = await axios.post(`http://localhost:4000/insert-personaje`, newPersonaje, { 
    const response = await axios.post(`https://znkranking.onrender.com/insert-personaje`, newPersonaje, {   
    headers: {
        'Content-Type': 'application/json', // Asegúrate de que el encabezado Content-Type sea application/json
      },
    });
    const { idpersonaje } = response.data;
    
    setPersonajes([...personajes, { ...newPersonaje, idpersonaje }]);

    //ESTO ES CUANDO LIMPIA LOS CAMPOS 
    setCargarNombre("");
    setCargarDominio("");
    setCargarConviccion("");
    setCargarKen("");
    setImagenBase("/imagenBase.jpeg");
    setLastAddedId(idpersonaje);

  //lalam a la peticion 
      const fetchPersonajes = async () => {
        try {
          //const response = await axios.get('http://localhost:4000/personajes');
          const response = await axios.get(`https://znkranking.onrender.com/personajes`);
          setPersonajes(response.data);
        
        } catch (error) {
          console.error('Error al obtener los personajes:', error);
        }
      };
    
      fetchPersonajes();
   

    console.log("Last added ID:", idpersonaje);
  } catch (error) {
    console.error('Error al insertar el personaje:', error.message);
  }
};










  
  const handleImageUpload = () => {
    inputFileRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {     
      setImagenBase(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  return (
    <> 
     <div className='componenteCargar'>
      
          <div className='col1'>
            <img src={imagenBase}  className="imagenPj"/>
            <Button variant="outline-danger" onClick={handleImageUpload}  style={{width:"12em", marginTop:"1em", marginRight:"2em"}}>Seleccionar Imagen</Button>
            <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </div>

          <div className='container cargando'>
            <input type="text" placeholder="ingrese nombre de persoanje" value={cargarNombre} onChange={handleInputNombre}/>
            <input type="text" placeholder="ingrese dominio" value={cargarDominio}  onChange={handleInputDominio}/>
            <input type="number" placeholder="ingrese Ken" value={cargarKen}  onChange={handleInputKen}/>
            <input type="text" placeholder="ingresa la conviccion" value={cargarConviccion}  onChange={handleInputConviccion}/>
            <Button variant="outline-warning" style={{width:"auto", marginLeft:"13em"}} onClick={cargarPersonaje}>Cargar al ranking</Button>
          </div>
    
      
      </div>
     
    </>
  )
}


