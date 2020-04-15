import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

class Home extends React.Component {

  state = {
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
