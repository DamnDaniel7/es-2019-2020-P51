
import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

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
    if(this.props.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      if (this.refs.mainPanel) {
        this.refs.mainPanel.scrollTop = 0;
      }
    }
    document.documentElement.classList.remove("no-facebook");
  }

  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainPanel.scrollTop = 0;
  }

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
          {this.props.children}
        </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.username
  };
}

export default connect(mapStateToProps)(Layout);