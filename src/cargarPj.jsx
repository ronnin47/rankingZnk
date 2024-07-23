
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';





export const CargarPj = ({personajes,setPersonajes,lastAddedId,setLastAddedId}) => {

 


 const inputFileRef = useRef(null);

 const [imagen,setImagen]=useState("/imagenBase.jpeg")

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

  const cargarPersonaje=()=>{
    /*console.log(`funciona cargar personaje 
      Nombre:${cargarNombre} 
      Dominio: ${cargarDominio} 
      Ken:${cargarKen}
      Imagen:${imagen}`);*/



      const newPersonaje={
        id: uuidv4(),
        nombre: cargarNombre,
        dominio: cargarDominio,
        ken: cargarKen || 0,
        conviccion: cargarConviccion || "",
        imagen: imagen,
      }
      
      setPersonajes([...personajes, newPersonaje]);
      
      setCargarNombre("");
      setCargarDominio("");
      setCargarConviccion("");
      setCargarKen("");
      setImagen("/imagenBase.jpeg");
      setLastAddedId(newPersonaje.id)
      console.log("lastt id "+newPersonaje.id)
     
      //console.log(personajes)
  }




  
  const handleImageUpload = () => {
    inputFileRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {     
      setImagen(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  return (
    <> 
     <div className='componenteCargar'>
      
          <div className='col1'>
            <img src={imagen}  className="imagenPj"/>
            <Button variant="outline-danger" onClick={handleImageUpload}  style={{width:"12em", marginTop:"1em", marginRight:"2em"}}>Seleccionar Imagen</Button>
            <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </div>

          <div className='container cargando'>
            <input type="text" placeholder="ingrese nombre de persoanje" value={cargarNombre} onChange={handleInputNombre}/>
            <input type="text" placeholder="ingrese dominio" value={cargarDominio}  onChange={handleInputDominio}/>
            <input type="number" placeholder="ingrese Ken" value={cargarKen}  onChange={handleInputKen}/>
            <input type="text" placeholder="ingresa la conviccion" value={cargarConviccion}  onChange={handleInputConviccion}/>
            <Button variant="outline-warning" style={{width:"auto", marginLeft:"9em"}} onClick={cargarPersonaje}>Cargar al ranking</Button>
          </div>
    
      
      </div>
     
    </>
  )
}


