
import Card from 'react-bootstrap/Card';
import 'animate.css';

export const MiniCard = ({ id, nombre, dominio, ken, imagen,personajes}) => {
    /*console.log(`
      id: ${id}
      nombre: ${nombre}
      dominio: ${dominio}
      ken: ${ken}
      imagen: ${imagen}
    `);
    */
  /*
    const [animacionActiva, setAnimacionActiva] = useState(false);
  
    const seleccionar = () => {
      console.log("funciona seleccionar pj ", nombre);
      setPjSeleccionado(id);
      setActiveKey("2");
  
      setAnimacionActiva(true);
      setTimeout(() => {
        setAnimacionActiva(false);
      }, 1000);
    };
  */
    const index = personajes.findIndex(pj => pj.id === id);

  // Imprime el índice
  console.log(`Índice del personaje: ${index}`);



    return (
      <div className='cartas'>
        <p className="numeroRanking" style={{ fontFamily: "impact", textAlign: "center", fontSize: "2rem" }}>{index+1}</p>
        <Card style={{ width: '6em', border: "6px solid black" }} className='shadowBody animate__animated animate__fadeInTopLeft'>
          <Card.Img
            variant="top"
            src={imagen}
            style={{ maxWidth: "100%", maxHeight: "100%"}}
          />
          <Card.Body
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
         
        </Card>
      </div>
    );
  };