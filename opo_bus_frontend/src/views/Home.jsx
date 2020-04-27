import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import axios from "axios";
import ReactTable from "react-table";

class Home extends React.Component {

  state = {
    bus: [],
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
    parkData: {
      "features": [
        {
          "type": "Feature",
          "properties": {
            "PARK_ID": 960,
            "NAME": "Bearbrook Skateboard Park",
            "DESCRIPTIO": "Flat asphalt surface, 5 components"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [41.1497, -8.6213]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "PARK_ID": 1219,
            "NAME": "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
            "DESCRIPTIO": "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [41.1497, -8.6213]
          }
        }
      ]
    },
    activePark: null
  }

  componentDidMount(){
    axios.get("http://192.168.160.103:51080/bus").then(res => {
      this.setState({
        bus: res.data
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
                    <Marker position={[41.1497, -8.6213]}>
                      <Popup>
                        Teste Marcador e Popup <br /> Easily customizable.
                      </Popup>
                    </Marker>
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
