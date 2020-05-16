import React from "react";
import {Card, CardBody, Col, Row, Button} from "reactstrap";
import {Map, Marker, Popup, TileLayer, Polyline} from "react-leaflet";
import L from 'leaflet'
import axios from "axios";
import { connect } from "react-redux";

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
  }


  componentDidMount(){
    axios.get("http://192.168.160.103:51080/records").then(res => {
      this.setState({
        records: res.data
      })
      console.log(res.data)
    })
  }

  addAlarm = (longitude, latitude, date, bus, username) => {
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
                              ID: {record["recordsId"]} | Head: {record["head"]} | timestamp: {record["timestamp"]} | <Button onClick={this.addAlarm(record["latitude"], record["longitude"], record["timestamp"], record["recordsId"], this.props.username)}>Adicionar Alarme <i class="fas fa-bell"></i></Button>
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
