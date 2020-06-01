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
                      <CardTitle tag="h2">Dashboard</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <iframe src="http://192.168.160.103:5601/s/esp51/app/kibana#/dashboard/49ce5030-98e2-11ea-9439-01ab91ef970e?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15y%2Cto%3Anow))" height="600" width="100%"></iframe>
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
