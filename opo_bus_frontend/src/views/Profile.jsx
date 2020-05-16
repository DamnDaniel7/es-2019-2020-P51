import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Row,
  Col
} from "reactstrap";

import axios from "axios";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSubcategories: 'ps0',
      equipaSigla: this.props.match.params.nome,
      equipa: {equipa:"",modalidades:[], nucleo:"", siglaE:"",siglaN:""}
    };
    this.getEquipa = this.getEquipa.bind(this);
  }

  componentDidMount() {
    this.getEquipa();
  }

  getEquipa(){
    axios.get("https://taca-ua-nei.com/teams/sigla/"+this.props.match.params.nome)
        .then(res => {
          const equipa = res.data[0];
          this.setState({equipa});
        })
  }

  render() {
    return (
        <>
          <div className="content">
            <Row>
              <Col md="9">
                <Card>
                  <CardHeader role="tab">
                    <h5 className="title"></h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg={2} md={3} xs={12}>
                        <Nav pills className="nav-pills-primary nav-pills-icons flex-column">
{/*                          {this.state.equipa.modalidades.map((modalidade, index) => {
                            return(
                                <NavItem>
                                  <NavLink
                                      className={this.state.pageSubcategories === "ps"+index ? "active":""}
                                      onClick={() => this.setState({pageSubcategories: "ps"+index})}
                                  >
                                    <img
                                        alt="..."
                                        height={30}
                                        src={require("assets/img/"+this.getIcon(modalidade))}
                                    />
                                    <br/>
                                    {modalidade}
                                  </NavLink>
                                </NavItem>
                            )
                          })}*/}
                        </Nav>
                      </Col>
                      <Col lg={10} md={9} xs={12}>
                        <TabContent className="tab-space" activeTab={this.state.pageSubcategories}>
{/*                          {this.state.equipa.modalidades.map((modalidade, index) => {
                            return(
                                <TabPane tabId={"ps"+index}>
                                  <GamesTables team={this.state.equipa.equipa} modalidade={modalidade} />
                                </TabPane>
                            )
                          })}*/}
                        </TabContent>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                            alt="..."
                            className="avatar"
                            src={require("assets/img/icon.png")}
                        />
                        <h5 className="title">-</h5>
                        <br/>
                        <p className="description">-</p>
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
    );
  }
}

export default Profile;