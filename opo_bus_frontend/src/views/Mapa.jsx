import React from "react";
import {Card, CardBody, Col, Row, Button, Collapse, Input} from "reactstrap";
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
      minSpeed: 0,
      maxSpeed: 100000000,
      openedCollapses: [],
      bus: [],
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
    this.bigSpeed = this.bigSpeed.bind(this)
    this.smallSpeed = this.smallSpeed.bind(this)
    this.reduceBus = this.reduceBus.bind(this)
  }


  componentDidMount(){
    let to =new window.Date();
    let from = new window.Date(0,1,1,1,1,1,1)
    axios.get("http://192.168.160.103:51080/records").then(res => {
      let rec = res.data
      let busTempo = []
      rec.forEach( reco => {
        if (!busTempo.includes(reco.recordsId))
          busTempo.push({"value": reco.recordsId, "label": reco.recordsId})
      })
      this.setState({
        records: res.data,
        recordsAll: res.data,
        bus: busTempo,
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

  bigTimestamp(value){ 
    return new window.Date(value.timestamp) <= new window.Date(this.state.toTime);
  }

  smallTimestamp(value){ return new window.Date(value.timestamp) >= new window.Date(this.state.fromTime);}

  bigSpeed(value){ 
    console.log(this.state.maxSpeed)
    return value.speed <= this.state.maxSpeed;
  }

  smallSpeed(value){ 
    return value.speed >= this.state.minSpeed;
  }

  reduceBus(value){ 
    let temp = []
    try {
      if (this.state.allBus.length === 0){
        return true
      }
      else {
        this.state.allBus.forEach( bus => {
          if (!temp.includes(bus.value)){
            temp.push(bus.value)
          }
        })
        return temp.includes(value["recordsId"])
     }
    } catch (error) {
      return true
    }

  }


  addAlarm(longitude, latitude, date, bus, username) {
    axios.post("http://192.168.160.103:51080/alarm/addalarm", {longitude, latitude, date, bus, username}).then(res => {
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
                        <i className="fas fa-2x fa-sort-down"></i>
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
                          <Col xs="2" className="mt-2">
                            <Input type="number" name="minSpeed" id="minSpeed" placeholder="min Speed" onChange={(e) => {this.setState({minSpeed: e.target.value})}} />
                          </Col>
                          <Col xs="2" className="mt-2">
                            <Input type="number" name="maxSpeed" id="maxSpeed" placeholder="max Speed" onChange={(e) => {this.setState({maxSpeed: e.target.value})}} />
                          </Col>
                          <Col xs="7" className="mt-2">
                          </Col>
                          <Col xs="1" className="mt-2">
                            <h4 className="m-1">Buses: </h4>
                          </Col>
                          <Col xs="4" className="mt-2">
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
                              options={this.state.bus}
                            />
                          </Col>
                          <Col xs="9" className="mt-2">
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
                      this.state.records.filter(this.smallTimestamp).filter(this.bigTimestamp).filter(this.smallSpeed).filter(this.bigSpeed).filter(this.reduceBus).map(record => {
                        return(
                          <Marker position={[record["latitude"], record["longitude"]]} icon={pointerIcon}>
                            <Popup>
                              <div className="text-justify">
                                <b>ID:</b> {record["recordsId"]}
                                <br />
                                <b>Head:</b> {record["head"]}
                                <br />
                                <b>Timestamp:</b> {record["timestamp"]}
                                <br />
                                <b>Speed:</b> {record["speed"]}
                              </div>                            
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
