import React from "react";
import {Card, CardBody, Col, Row, Button} from "reactstrap";
import axios from "axios";
import ReactTable from "react-table";
import { connect } from "react-redux";
import Notify from 'react-notification-alert';

class Alarms extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alarms: [],
      visible: false,
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
          Header: 'Date',
          accessor: 'date',
          sortable: true,
          minWidth: 100,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Longitude',
          accessor: 'long',
          sortable: true,
          minWidth: 70,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Latitude',
          accessor: 'lat',
          sortable: true,
          minWidth: 70,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Minutes',
          accessor: 'min',
          sortable: true,
          minWidth: 50,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Bus ID',
          accessor: 'bus',
          sortable: true,
          minWidth: 150,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }, {
          Header: 'Actions',
          accessor: 'del',
          sortable: true,
          minWidth: 100,
          style: {
            textAlign: "center",
            wordBreak: "break-all",
          }
        }
      ],
    }
    this.delAlarm = this.delAlarm.bind(this);
  }

  componentDidMount(){
    axios.get("http://localhost:8080/alarm/"+this.props.username).then(res => {
      this.setState({
        alarms: res.data
      })
    })
  }

  delAlarm(id) {
    axios.delete("http://localhost:8080/alarm/removealarm/"+id).then(res => {
      var options = {
        place: "tc",
        message: "Alarm with id "+id+" removed with success",
        type: "success",
        autoDismiss: "10",
        icon: "fas fa-trash-alt"
      };
      this.refs.notify.notificationAlert(options);
      this.componentDidMount()
    })
  }

  render() {
    return (
      <>
        <Notify ref="notify"/>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardBody>
                  <ReactTable
                      data={this.state.alarms.map((alarm,index) => {
                        return({
                          id: alarm["id"],
                          date: alarm["date"],
                          long: alarm["longitude"],
                          lat: alarm["latitude"],
                          min: alarm["minutes"],
                          bus: alarm["bus"]["busID"],
                          del: (
                              <Button className="btn-round btn-icon" color="danger" onClick={() => this.delAlarm(alarm["id"])}><i className="fas fa-trash-alt"></i></Button>
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
