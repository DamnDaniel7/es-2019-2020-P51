import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
  Row,
  Col
} from "reactstrap";
import ReactTable from "react-table";

import axios from "axios";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet'
import { connect } from "react-redux";

export const pointerIcon = new L.Icon({
  iconUrl: require('assets/img/bus.png'),
  iconRetinaUrl: require('assets/img/bus.png'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [30, 30],
})

class Bus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busID: this.props.match.params.id,
      busRecords: [],
      colums: [
        {
          Header: '# ID',
          accessor: 'id',
          sortable: true,
          minWidth: 80,
          style: {
            textAlign: "center",
          }
        }, {
          Header: 'Time',
          accessor: 'time',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Speed',
          accessor: 'speed',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Head',
          accessor: 'head',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Longitude',
          accessor: 'lon',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Latitude',
          accessor: 'lat',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }
      ],
    };
    this.getBusRecords = this.getBusRecords.bind(this);
  }

  componentDidMount() {
    this.getBusRecords();
  }

  getBusRecords(){
    axios.get("http://192.168.160.103:51080/bus/"+this.props.match.params.id)
        .then(res => {
          const busRecords = res.data.recordsList;
          this.setState({busRecords});
        })
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
              <Col md="9">
                <Card>
                  <CardBody>
                    <Map center={[41.1497, -8.6213]} zoom={12}>
                      <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {
                        this.state.busRecords.map(record => {
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
                                  <hr />
                                </div>
                                <div className="text-center">
                                  <Button className="btn-simple" size="sm" onClick={ () => this.addAlarm(record["latitude"], record["longitude"], record["timestamp"], this.state.busID, this.props.username)}>Adicionar Alarme <i class="fas fa-bell"></i></Button>
                                </div>
                              </Popup>
                            </Marker>
                          )
                        })
                      }
                    </Map>
                    <br />
                    <br />
                    <ReactTable
                        data={this.state.busRecords.map((record) => {
                          return({
                            id: record["recordsId"],
                            time: record["timestamp"],
                            speed: record["speed"],
                            head: record["head"],
                            lon: record["longitude"],
                            lat: record["latitude"]
                          })
                        })}
                        noDataText="Sem Records para mostrar"
                        columns={this.state.colums}
                        showPaginationTop={false}
                        showPaginationBottom={false}
                        resizable={false}
                        className="-striped -highlight primary-pagination"
                    />
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
                        <h5 className="title">{this.state.busID}</h5>
                        <br/>
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

function mapStateToProps(state) {
  return {
    username: state.user.username
  };
}


export default connect(mapStateToProps)(Bus);