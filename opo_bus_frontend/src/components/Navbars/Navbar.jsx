import React from "react";
import classNames from "classnames";
import icon_logo from "assets/img/icon.png"

import {Container, Navbar, NavbarBrand,} from "reactstrap";

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }


  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  aria-label="Menu"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="/home">
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <div>
            </div>
              <div className="mx-right ml-auto navbar-nav">
                <h3
                  className="logo-text align-middle"
                >
                  <div className="photo">
                    <img src={icon_logo} alt="OPO-Bus Tracker Logo" />
                  </div>
                </h3>
              </div>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default MainNavbar;
