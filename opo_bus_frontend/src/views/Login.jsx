import React from "react";
import classnames from "classnames";
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from "reactstrap";
import {login} from "actions/auth"
import {connect} from "react-redux";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      wrongCredentials: false,
    };
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({wrongCredentials: false});
    const submit = {username: this.state.email,password: this.state.password};
    this.props.login(submit).then((val) => {
      console.log(val)
      if(val===false){
        this.setState({wrongCredentials: true});
      }
      else {
        this.props.history.push("/dashboard");
      }
    });
  }


  render() {
    return (
        <div className="wrapper wrapper-full-page">
          <div className="full-page login-page">
            <div className="shape">
            </div>
            <div className="content">
              <Container>
                <Row>
                  <Col md={6} lg={4} className="mr-auto ml-auto">
                    <Card className="card-white card-login">
                      <CardHeader>
                        <img src={require("assets/img/login.png")} />
                        <CardTitle className="login">
                          Log in
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <form className="form-login" onSubmit={this.submit}>
                          <InputGroup className={classnames({
                            "input-group-focus": this.state.focus
                          })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fas fa-envelope"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="email"
                                name="email"
                                title="email"
                                placeholder="Email"
                                autoComplete="username"
                                value={this.state.email}
                                onChange={((event) => {this.setState({email: event.target.value, wrongCredentials: false});})}
                                onFocus={(e) => this.setState({ focus: true })}
                                onBlur={(e) => this.setState({ focus: false })}
                            />
                          </InputGroup>
                          <InputGroup className={classnames({
                            "input-group-focus": this.state.focus
                          })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fas fa-key"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="password"
                                name="password"
                                title="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={((event) => {this.setState({password: event.target.value, wrongCredentials: false});})}
                                onFocus={(e) => this.setState({ focus: true })}
                                onBlur={(e) => this.setState({ focus: false })}
                            />
                          </InputGroup>
                          {
                            (this.state.wrongCredentials)
                                ?
                                <Alert color="danger">
                                  Credenciais Erradas
                                </Alert>
                                :
                                null
                          }
                          <Button block type="submit" size="lg" color="warning" className="mt-4 mb-1" onClick={this.submit} onSubmit={this.submit}>
                            Get Started
                          </Button>
                        </form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null, { login })(Login);