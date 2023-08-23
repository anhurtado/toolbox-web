import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const HeaderComponent = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>React App</Navbar.Brand>
      </Container>
    </Navbar>
  )
}