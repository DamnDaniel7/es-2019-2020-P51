import React from "react";
import {
  Link
} from "react-router-dom";
import classNames from 'classnames';
// reactstrap components
import { Card, CardHeader, CardBody, Row, Input, Modal, Button, Col, InputGroup, ButtonGroup } from "reactstrap";
import axios from "axios";
import ReactLoading from "react-loading";

class Buses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalSearch: false,
      color: "navbar-transparent",
      activeTab: 'data1',
      search: "",
      buses_todas: [],
      buses: []
    };
  }

  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.getEquipas();
  }

  getEquipas(){
    axios.get("http://localhost:8080/bus")
        .then(res => {
          const buses = res.data;
          this.setState({buses: buses, buses_todas: buses});
        })
  }

  handleSearch = event => {
    this.setState({
      search: event.target.value
    })
    if (event.target.value.length >= 0)
      this.search(event.target.value)
  }

  search = word => {
    let temp = []
    this.state.buses_todas.forEach(bus => {
      if (bus["busID"].toLowerCase().includes(word.toLowerCase())){
        temp.push(bus)
      }
    })
    console.log(temp)
    this.setState({
      buses: temp
    })
  }

  render() {
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card className="card-main">
                  <CardHeader>
                    <Row>
                      <Col lg={6} md={6} sm={6} xs={4}>
                        <InputGroup className="search-bar">
                          <Button
                              className="pt-0"
                              color="link"
                              data-target="#searchModal"
                              data-toggle="modal"
                              id="search-button"
                              onClick={this.toggleModalSearch}
                          >
                            <i className="fas fa-search" />
                            <span className="d-lg-none d-md-block text-white">Search</span>
                          </Button>
                        </InputGroup>
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={8}>
                        <ButtonGroup
                            className="btn-group-toggle float-right"
                            data-toggle="buttons"
                        >
                          <Button
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.activeTab === "data1"
                              })}
                              onClick={() => this.toggle("data1")}
                              color="info"
                              id="0"
                              size="sm"
                          >
                            <input
                                defaultChecked
                                className="d-none"
                                name="options"
                                type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-none d-xl-none">
                              Grid
                            </span>
                            <span className="d-block d-sm-none">
                            <i className="fas fa-th"></i>
                          </span>
                          </Button>
                          <Button
                              color="info"
                              id="2"
                              size="sm"
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.activeTab === "data3"
                              })}
                              onClick={() => this.toggle("data3")}
                          >
                            <input
                                className="d-none"
                                name="options"
                                type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-none d-xl-none">
                              Table
                            </span>
                            <span className="d-block d-sm-none">
                            <i className="fas fa-table" />
                          </span>
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="all-icons">
                    {
                      (this.state.buses.length === 0)
                      ?
                      <ReactLoading className="text-center mx-auto my-auto" type="spinningBubbles" />
                      :
                      <Row>
                        {
                          this.state.buses.map(bus => {
                            return(
                                <Col
                                    md="3"
                                    sm="4"
                                    key={bus.busID}
                                >
                                  <Link to={"/bus/"+bus.busID}>
                                    <div className="font-icon-detail equipas-box">
                                      <img
                                          alt="bus"
                                          height={150}
                                          src={require("assets/img/icon.png")}
                                      />
                                      <br/>
                                      <br/>
                                      <h4 className="modalidade-title">{bus.busID}</h4>
                                    </div>
                                  </Link>
                                </Col>
                            )
                          })
                        }
                      </Row>
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          <Modal
              modalClassName="modal-search"
              isOpen={this.state.modalSearch}
              toggle={this.toggleModalSearch}
          >
            <div className="modal-header">
              <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" value={this.state.search} onChange={this.handleSearch} />
              <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={this.toggleModalSearch}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </Modal>
        </>
    );
  }
}

export default Buses;
