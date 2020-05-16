import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import ReactTable from "react-table";
import L from 'leaflet'
import axios from "axios";

export const pointerIcon = new L.Icon({
  iconUrl: require('assets/img/bus.png'),
  iconRetinaUrl: require('assets/img/bus.png'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [30, 30],
})

class Home extends React.Component {

  state = {
    bus: [],
    records: [],
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
  }

  componentDidMount(){
    axios.get("http://192.168.160.103:51080/bus").then(res => {
      this.setState({
        bus: res.data
      })
    })
    axios.get("http://192.168.160.103:51080/records").then(res => {
      this.setState({
        records: res.data
      })
    })
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" xs="6">
                      <h5 className="card-category">Main Board</h5>
                      <CardTitle tag="h2">Map</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Map center={[41.1497, -8.6213]} zoom={14}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {
                      this.state.records.map(record => {
                        return(
                          <Marker position={[record["latitude"], record["longitude"]]} icon={pointerIcon}>
                            <Popup>
                              ID: {record["recordsId"]} | Head: {record["head"]} | timestamp: {record["timestamp"]}
                            </Popup>
                          </Marker>
                        )
                      })
                    }
                  </Map>
                  <br />
                  <br />
                  <ReactTable
                      data={this.state.bus.map((bus,index) => {
                        return({
                          id: bus["busID"],
                          record: (
                              bus["recordsList"].map(record => {
                                return(
                                  <>
                                    <span><b>Timestamp:</b> {record["timestamp"]} | <b>Speed:</b> {record["speed"]} | <b>Longitude:</b> {record["longitude"]} | <b>Latitude:</b> {record["latitude"]} | <b>Direção:</b> {record["head"]} |</span>
                                    <br />
                                    <hr/>
                                  </>
                                )
                              })
                          ),
                        })
                      })}
                      noDataText="Sem Autocarros para mostrar"
                      columns={this.state.colums}
                      showPaginationTop={false}
                      showPaginationBottom={false}
                      resizable={false}
                      className="-striped -highlight primary-pagination"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Home;
