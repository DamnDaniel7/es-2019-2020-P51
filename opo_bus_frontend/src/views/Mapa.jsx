import React from "react";
import {Card, CardBody, Col, Row, Button, Collapse} from "reactstrap";
import {Map, Marker, Popup, TileLayer, Polyline} from "react-leaflet";
import L from 'leaflet'
import axios from "axios";
import { connect } from "react-redux";
import Datetime from 'react-datetime';
import Select from "react-select";
import "react-datetime/css/react-datetime.css";

export const pointerIcon = new L.Icon({
  iconUrl: require('assets/img/bus.png'),
  iconRetinaUrl: require('assets/img/bus.png'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [30, 30],
})

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

class Mapa extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      records: [],
      recordsAll: [],
      fromTime: null,
      toTime: null,
      openedCollapses: [],
      allBus: [],
      colums: [
        {
          Header: '# ID',
          accessor: 'id',
          sortable: true,
          minWidth: 40,
          style: {
            textAlign: "center",
          }
        }, {
          Header: 'Records',
          accessor: 'record',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }
      ],
    };
    this.bigTimestamp = this.bigTimestamp.bind(this)
    this.smallTimestamp = this.smallTimestamp.bind(this)
    this.reduceRecords = this.reduceRecords.bind(this)
  }


  componentDidMount(){
    let to =new window.Date();
    let from = new window.Date(0,1,1,1,1,1,1)
    axios.get("http://localhost:8080/records").then(res => {
      this.setState({
        records: res.data,
        recordsAll: res.data,
        fromTime: from,
        toTime: to
      })
    })
  }

  collapsesToggle = collapse => {
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: []
      });
    } else {
      this.setState({
        openedCollapses: [collapse]
      });
    }
  };

  reduceRecords = () => {
    this.setState({
      records: this.state.recordsAll.filter(this.smallTimestamp).filter(this.bigTimestamp)
    })
  }

  bigTimestamp(value){ 
    return new window.Date(value.timestamp) <= new window.Date(this.state.toTime);
  }

  smallTimestamp(value){ return Date(value.timestamp) >= Date(this.state.fromTime);}


  addAlarm(longitude, latitude, date, bus, username) {
    axios.post("http://localhost:8080/alarm/addalarm", {longitude, latitude, date, bus, username}).then(res => {
      this.setState({
        records: res.data
      })
      console.log(res.data)
    })
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="2">
                      <h3 className="m-1">Time Filter: </h3>
                    </Col>
                    <Col xs="2">
                      <Datetime
                        inputProps={{placeholder:"From"}}
                        onChange={(value) => {this.setState({fromTime: new window.Date(value._d)})}}
                      />
                    </Col>
                    <Col xs="2">
                      <Datetime
                        inputProps={{placeholder:"To"}}
                        onChange={(value) => {this.setState({toTime: new window.Date(value._d)})}}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs="12">
                      <a
                        aria-expanded={this.state.openedCollapses.includes(
                          "collapseOne"
                        )}
                        href="#pablo"
                        data-parent="#accordion"
                        data-toggle="collapse"
                        className="m-1"
                        onClick={(e) => {e.preventDefault();this.collapsesToggle("collapseOne")}}
                      >
                        More Filters{" "}
                        <i class="fas fa-2x fa-sort-down"></i>
                      </a>
                    </Col>
                    <Col xs="12">
                      <Collapse
                        role="tabpanel"
                        isOpen={this.state.openedCollapses.includes("collapseOne")}
                      >
                        <Row>
                          <Col xs="1" className="mt-2">
                            <h4 className="m-1">Speed: </h4>
                          </Col>
                          <Col xs="1" className="mt-2">
                            <Datetime
                              inputProps={{placeholder:"Min"}}
                            />
                          </Col>
                          <Col xs="1" className="mt-2">
                            <Datetime
                              inputProps={{placeholder:"Max"}}
                            />
                          </Col>
                          <Col xs="9" className="mt-2">
                          </Col>
                          <Col xs="1" className="mt-2">
                            <h4 className="m-1">Buses: </h4>
                          </Col>
                          <Col xs="2" className="mt-2">
                            <Select
                              className="react-select info"
                              classNamePrefix="react-select"
                              placeholder="Choose Bus(es)"
                              name="multipleSelect"
                              closeMenuOnSelect={false}
                              isMulti
                              value={this.state.allBus}
                              styles={{zIndex: "100"}}
                              onChange={value =>
                                this.setState({ allBus: value })
                              }
                              options={[
                                {
                                  value: "",
                                  label: "All Buses",
                                  isDisabled: true
                                },
                                { value: "2", label: "Paris " },
                                { value: "3", label: "Bucharest" },
                                { value: "4", label: "Rome" },
                                { value: "5", label: "New York" },
                                { value: "6", label: "Miami " },
                                { value: "7", label: "Piatra Neamt" },
                                { value: "8", label: "Paris " },
                                { value: "9", label: "Bucharest" },
                                { value: "10", label: "Rome" },
                                { value: "11", label: "New York" },
                                { value: "12", label: "Miami " },
                                { value: "13", label: "Piatra Neamt" },
                                { value: "14", label: "Paris " },
                                { value: "15", label: "Bucharest" },
                                { value: "16", label: "Rome" },
                                { value: "17", label: "New York" },
                                { value: "18", label: "Miami " },
                                { value: "19", label: "Piatra Neamt" }
                              ]}
                            />
                          </Col>
                          <Col xs="9" className="mt-2">
                          </Col>
                          <Col xs="12">
                            <Button size="sm" color="primary" className="animation-on-hover m-0">Apply</Button>
                          </Col>
                        </Row>
                      </Collapse>
                    </Col>
                  </Row>
                  <br />

                  <Map center={[41.1497, -8.6213]} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {
                      this.state.records.filter(this.smallTimestamp).filter(this.bigTimestamp).map(record => {
                        return(
                          <Marker position={[record["latitude"], record["longitude"]]} icon={pointerIcon}>
                            <Popup>
                              ID: {record["recordsId"]} | Head: {record["head"]} | timestamp: {record["timestamp"]} | <Button onClick={ () => this.addAlarm(record["latitude"], record["longitude"], record["timestamp"], record["recordsId"], this.props.username)}>Adicionar Alarme <i class="fas fa-bell"></i></Button>
                            </Popup>
                          </Marker>
                        )
                      })
                    }
                    <Polyline color="lime" positions={multiPolyline} />
                  </Map>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username
  };
}

export default connect(mapStateToProps)(Mapa);
