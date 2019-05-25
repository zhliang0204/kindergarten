import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {withRouter } from 'react-router-dom';
import api from '../../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
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
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          <Form >
          <FormGroup row>
              <Label for="email" sm={2}>Email：</Label>
              <Col sm={10}>
                <Input type="text" name="email" id="email" value={this.state.email} onChange={this.handleInputChange}/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="password" sm={2}>Password：</Label>
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
