import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {withRouter } from 'react-router-dom';
import api from '../../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        {this.state.isGerman && (<div className="german">german</div>)}

        {!this.state.isGerman && (<div className="chinese">
          <Form>
          <FormGroup row>
              <Label for="username" sm={2}>用户名：</Label>
              <Col sm={10}>
                <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleInputChange}/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="password" sm={2}>用户名：</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange}/>
              </Col>
            </FormGroup>

            <Button onClick={(e) => this.handleClick(e)}>登陆</Button>
          </Form>
          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}          
        </div>)}

        
      </div>
    );
  }
}

export default withRouter(Login);
