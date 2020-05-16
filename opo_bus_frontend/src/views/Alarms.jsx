import React from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import axios from "axios";
import ReactTable from "react-table";
import { connect } from "react-redux";

class Alarms extends React.Component {

  state = {
    alarms: [],
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
    axios.get("http://192.168.160.103:51080/alarms/"+this.props.username).then(res => {
      this.setState({
        alarms: res.data
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
                <CardBody>
                  <ReactTable
                      data={this.state.alarms.map((bus,index) => {
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
                      noDataText="Sem Alarmes para mostrar"
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

function mapStateToProps(state) {
  return {
    username: state.user.username
  };
}

export default connect(mapStateToProps)(Alarms);
