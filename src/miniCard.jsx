
import Card from 'react-bootstrap/Card';
import 'animate.css';
import { useEffect,useState, useRef} from 'react';

import {CartaPj } from './cartaPj';






export const MiniCard = ({ id, nombre, dominio, ken, imagen,conviccion, personajes, setPersonajes, focus}) => {

  const cardRef = useRef(null); // Crear una referencia para la tarjeta
    /*console.log(`
      id: ${id}
      nombre: ${nombre}
      dominio: ${dominio}
      ken: ${ken}
      imagen: ${imagen}
    `);
    */
    const index = personajes.findIndex(pj => pj.id === id);

    useEffect(() => {
      if (focus === id && cardRef.current) {
        // Desplazar la tarjeta al centro de la vista si coincide con el ID de enfoque
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, [focus, id]);

//console.log("ultimo id en componennete minicard: "+focus);

 const [classBrillosDestino,setClassBrillosDestino]=useState("numeroRanking")
 const [classCardDestino,setClassCardDestino]=useState("shadowBody ")


 useEffect(() => {
  if (ken >= 400) {
    console.log(`El personaje es una estrella del destino con ${ken}`);
    setClassBrillosDestino("numeroRanking classEstrella");
    setClassCardDestino("classCardDestino")

  } else {
    setClassBrillosDestino("numeroRanking");
    setClassCardDestino("shadowBody ")
  }
}, [ken]);

 //console.log("contenido de class: "+classBrillosDestino)

/*
 const arbirCartaPj=()=>{
  console.log("funciona abrir carta pj")
  return(
    <>
    <CartaPj></CartaPj>
    </>
  )
  
      
 }
 */



 const [showCartaPj, setShowCartaPj] = useState(false);


 
 const handleCardClick = () => {
  console.log("funciona abrir carta pj");
  setShowCartaPj(true); // Mostrar CartaPj al hacer clic
};

const handleCloseCartaPj = () => {
  setShowCartaPj(false); // Ocultar CartaPj
};

 



    return (
      <div className='cartas' >
        <p className={`${classBrillosDestino}`} style={{ fontFamily: "impact", textAlign: "center"}}>{index+1}</p>
        <Card ref={cardRef} style={{ width: '6em', border: "6px solid black" }} className={`animate__animated animate__fadeInTopLeft ${classCardDestino}`}>
          <Card.Img
            onClick={handleCardClick}
            variant="top"
            src={imagen}
            style={{ maxWidth: "100%", maxHeight: "100%"}}
          />
          <Card.Body
            onClick={handleCardClick}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: "linear-gradient(to right, #FDF5E6, #FFDAB9, #FFE4B5, #FFDAB9, #FDF5E6)",
              minHeight: "100%",
              width: "100%",
              height: "100%",
              border: "3px solid orange"
            }}
          >
            <Card.Title style={{ textAlign: "center", margin: "0px" }}>{nombre}</Card.Title>
            <p style={{ fontFamily: "impact", textAlign: "center", margin: "0", fontSize: "0.9rem" }}>{dominio}</p>
            <p style={{ fontFamily: "impact", textAlign: "center", margin: "0", fontSize: "2rem" }}>{ken}</p>
            

            
           
          </Card.Body>
          {showCartaPj && (
        <CartaPj onClose={handleCloseCartaPj} id={id} imagen={imagen} nombre={nombre} dominio={dominio} ken={ken} conviccion={conviccion} personajes={personajes} setPersonajes={setPersonajes}/>
        )}
         
        </Card>
      </div>
    );
  };