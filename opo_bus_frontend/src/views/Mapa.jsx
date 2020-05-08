import React from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet'
import axios from "axios";

export const pointerIcon = new L.Icon({
  iconUrl: require('assets/img/bus.png'),
  iconRetinaUrl: require('assets/img/bus.png'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [30, 30],
})

class Mapa extends React.Component {

  state = {
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
    axios.get("http://192.168.160.103:51080/records").then(res => {
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
                  <Map center={[41.1497, -8.6213]} zoom={12}>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Mapa;
