
import Card from 'react-bootstrap/Card';
import 'animate.css';
import { useEffect, useState, useRef } from 'react';
import { CartaPj } from './cartaPj';
import '../css/wickedcss.min.css';
import { Buffer } from 'buffer';

export const MiniCard = ({ imagenBase, setImagenBase, rank, idpersonaje, nombre, dominio, ken, imagen, conviccion, personajes, setPersonajes, focus }) => {

  const [classBrillosDestino, setClassBrillosDestino] = useState("numeroRanking");
  const [classCardDestino, setClassCardDestino] = useState("shadowBody");
  const [showCartaPj, setShowCartaPj] = useState(false);




  /************************************************ */
//esta en base 64 la imagen de personajes, pj.imagen
 // console.log("CONTENIDO DE pj.IMAGEN: "+JSON.stringify(imagen))
  const cardRef = useRef(null);
  //un nuevo state para la imagen que tiene que mostrarse en la card
  const [imageSrc, setImageSrc] = useState(imagenBase);



 
  
 
  useEffect(() => {
    if (imagen && imagen.data) {
      let imageData = imagen.data;

      // Depura el valor de imageData
      //console.log('Datos de imagen antes de limpiarlos:', imageData);
      imageData =Buffer.from(imageData).toString('base64')
      //console.log("IMAGEDATA: "+imageData)
      // Verifica si los datos ya están en formato base64 con prefijo
      if (typeof imageData === 'string' && imageData.startsWith('dataimage/jpegbase64/')) {
        // Si es una cadena base64 con prefijo, elimina el prefijo
        imageData = imageData.replace('dataimage/jpegbase64/', '');
       // console.log("paso por aca y lo limpio: "+imageData)
        
      }

      // Verifica si imageData ya es una cadena base64 limpia
      // Si imageData es binario, conviértelo a base64
      const base64String = typeof imageData === 'string'
        ? imageData // Ya está en formato base64 limpio
        : Buffer.from(imageData).toString('base64'); // Convertir binario a base64

      const mimeType = 'image/jpeg'; // Cambia esto si el tipo de imagen es diferente
      const url = `data:${mimeType};base64,/${base64String}`;
     // console.log("URL Generada: " + url);

      // Actualiza el estado de la imagen
      setImageSrc(url);
      // Intenta crear una imagen para verificar si es válida
    const img = new Image();
    img.src = url;
    img.onload = () => {
      // Si la imagen se carga correctamente, actualiza el estado
      setImageSrc(url);
    };
    img.onerror = () => {
      // Si ocurre un error al cargar la imagen, usa la imagen base predeterminada
      setImageSrc(imagenBase);
    };
    } else {
      setImageSrc(imagenBase); // Imagen predeterminada si no hay datos
    }
  }, [imagen]); 


  /****************************** */



//FOCUS Y ESTYLES PARA LA CARD
  useEffect(() => {
    if (focus === idpersonaje && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focus, idpersonaje]);

  useEffect(() => {
    if (ken >= 400) {
      setClassBrillosDestino("numeroRanking classEstrella");
      setClassCardDestino("classCardDestino");
      console.log("es una estrella del destino")
    } else {
      setClassBrillosDestino("numeroRanking");
      setClassCardDestino("shadowBody");
    }
  }, [ken]);

  const handleCardClick = () => {
    setShowCartaPj(true);
  };

  const handleCloseCartaPj = () => {
    setShowCartaPj(false);
  };

  return (
    <div className='cartas'>
      <p className={classBrillosDestino} style={{ fontFamily: "impact", textAlign: "center" }}>{rank}</p>
      <Card ref={cardRef} style={{ width: '7em', border: "6px solid black" }} className={`animate__animated animate__fadeInTopLeft ${classCardDestino}`}>
        <Card.Img
          onClick={handleCardClick}
          variant="top"
          src={imageSrc}
          alt="imagen"
          style={{ maxWidth: "100%", maxHeight: "100px" }}
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
          <Card.Title style={{ textAlign: "center", margin: "0px" , fontFamily:"cursive", maxWidth:"200%"}}>{nombre}</Card.Title>
          <p style={{ fontFamily: "impact", textAlign: "center", margin: "0", fontSize: "0.9rem" }}>{dominio}</p>
          <p style={{ fontFamily: "impact", textAlign: "center", margin: "0", fontSize: "2rem" }}>{ken}</p>
        </Card.Body>
        {showCartaPj && (
          <CartaPj
            onClose={handleCloseCartaPj}
            idpersonaje={idpersonaje}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            setImagenBase={setImagenBase}
            nombre={nombre}
            dominio={dominio}
            ken={ken}
            conviccion={conviccion}
            personajes={personajes}
            setPersonajes={setPersonajes}
          />
        )}
      </Card>
    </div>
  );
};