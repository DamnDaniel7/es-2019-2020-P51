import React from "react";

import {Container} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <div className="copyright">
            © {new Date().getFullYear()} Engenharia de Software, Universidade de Aveiro
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
