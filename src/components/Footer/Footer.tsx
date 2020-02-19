import * as React from 'react';
import './index.css';

import { Navbar, Alert, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Alert variant="primary" className="footer">
      <Navbar className="footer_item">
        <Nav>Culture Portal by RSS team #14</Nav>
        <Nav.Link as={Link} to="/about">
          О нас
        </Nav.Link>
      </Navbar>
    </Alert>
  );
};

export default Footer;
