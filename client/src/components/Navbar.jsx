import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import logo from '/assets/nasa-logo.png';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faInfoCircle, faEnvelope, faSave, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          <img src={logo} alt="NASA Logo" width="60" height="50" className="d-inline-block align-top rounded-circle" />
          <span className="ml-3 font-weight-bold">MyNasaApp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar' className='custom-toggler' />
        <Navbar.Collapse id='navbar' className='justify-content-end'>
          <Nav className='ml-auto'>
            <Nav.Link as={Link} to='/'><FontAwesomeIcon icon={faImage} /> See Images</Nav.Link>
            <Nav.Link as={Link} to='/about'><FontAwesomeIcon icon={faInfoCircle} /> About</Nav.Link>
            <Nav.Link as={Link} to='/contact'><FontAwesomeIcon icon={faEnvelope} /> Contact</Nav.Link>
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to='/saved'><FontAwesomeIcon icon={faSave} /> See Your Saved Images</Nav.Link>
                <Nav.Link onClick={Auth.logout}><FontAwesomeIcon icon={faSignInAlt} /> Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faSignInAlt} /> Login/Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* ... rest of your component */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </Navbar>
  );
};

export default AppNavbar;
