
/*
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Nava=({tituloNav})=> {
  return (
    <>
      <Navbar className="navbar-dark bg-dark">
    <Container>
      <Navbar.Brand href="#home" className="text-light">
        <img
          alt=""
          src="./src/assets/mitama.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{tituloNav}
      </Navbar.Brand>
    </Container>
  </Navbar>
    </>
  );
}


*/



import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




export const Nava= ({tituloNav})=> {

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">
         <img
          alt=""
          src="./src/assets/mitamaDorada.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{marginLeft:"3em"}}
        />
        {tituloNav}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"></Nav.Link>
            <Nav.Link href="#action2"></Nav.Link>          
            <Nav.Link href="#" disabled>
              
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
