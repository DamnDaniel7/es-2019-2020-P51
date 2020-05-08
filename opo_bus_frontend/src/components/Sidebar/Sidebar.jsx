import React from "react";
import {Link, NavLink} from "react-router-dom";

import {Nav} from "reactstrap";


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {
    if(localStorage.getItem("opo_busTHEME")==="light")
      this.activateMode("light")
  }

  activateMode = mode => {
    switch (mode) {
      case "light":
        localStorage.opo_busTHEME = "light"
        document.body.classList.add("white-content");
        break;
      default:
        localStorage.removeItem("opo_busTHEME")
        document.body.classList.remove("white-content");
        break;
    }
  };

  render() {
    const { routes, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }

    return (
      <div className="sidebar">
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop, key) => {
              if (prop.redirect || prop.sidebar === false) return null;
              return (
                <li
                    className={
                      this.activeRoute(prop.path) +
                      (prop.pro ? "active-pro" : "")
                    }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
          <div className="position-fixed theme nav-link" style={{bottom: "5%"}}>
            <h4 className="text-white">Theme</h4>
            <ul className="nav">
              <li>
                <span
                  className="badge light-badge mr-2"
                  onClick={() => this.activateMode("light")}
                />{" "}
                <span className="color-label">LIGHT MODE</span>{" "}
              </li>
              <li>
                <span
                  className="badge dark-badge mr-2"
                  onClick={() => this.activateMode("dark")}
                />{" "}
                <span className="color-label">DARK MODE</span>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
