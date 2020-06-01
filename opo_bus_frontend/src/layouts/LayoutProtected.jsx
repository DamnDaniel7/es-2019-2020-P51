
import React from "react";
import { Route} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Navbar from "components/Navbars/Navbar";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Notify from 'react-notification-alert';

import routes from "routesProtected";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened:
          document.documentElement.className.indexOf("nav-open") !== -1,
    };
  }

  componentDidMount(){
    console.log(this.props.isAuthenticated)
    if(!this.props.isAuthenticated){
      this.props.history.push("/login");
    }
    setInterval(this.alarms(), 1000);
  }

  alarms(){
    axios.get("http://localhost:8080/alarm/"+this.props.username).then(res => {
      let temp = [];
      temp = res.data;
      temp.forEach(alarm => {
        if(alarm.active === true) {
          var options = {
            place: "tr",
            message: "Alert: Bus "+alarm.bus.busID+" from alarm with id "+alarm.id+" is approching",
            type: "primary",
            autoDismiss: "10",
            icon: "fas fa-bell"
          };
          this.refs.notify.notificationAlert(options);
        }
      })
    })
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainPanel.scrollTop = 0;
  }

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
          path === routes[parseInt(i)].path
      ) {
        return routes[parseInt(i)].name;
      }
    }
    return "OPOBUS Tracker";
  };

  getComponent = () => {
    return (
        <Route
            path={this.props.path}
            component={this.props.component}
            exact
        />
    );
  };

  render() {
    return (
        <>
          <Notify ref="notify"/>
          <div className="wrapper wrapper-full-page">
            <Sidebar
                {...this.props}
                routes={routes}
                toggleSidebar={this.toggleSidebar}
            />
            <div
                className="full-page main-panel"
                ref="mainPanel"
            >
              <Navbar
                  {...this.props}
                  brandText={this.getBrandText(this.props.location.pathname)}
                  toggleSidebar={this.toggleSidebar}
                  sidebarOpened={this.state.sidebarOpened}
              />
              {this.props.children}
            </div>
          </div>
        </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.username,
    username: state.user.username
  };
}

export default connect(mapStateToProps)(Layout);