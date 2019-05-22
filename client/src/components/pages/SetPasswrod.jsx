import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "./../../api";


export default class SetPasswrod extends Component {
  constructor(props){
    super(props)
    this.state={
      useremail:"",
      password:""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    let setPasInfo = {
      email:this.state.useremail,
      password: this.state.password,
    }
    // let userId = this.props.match.params.id;
    // let userId = "5cd97e04b2fb823e84977e21";
    let userId = this.props.info.match.params.id;


    api.setPassword(userId, setPasInfo)
        .then(res => {
          // console.log(true)
          console.log('SUCCESS!')
          this.props.info.history.push("/login")
        })

  }
  render() {
    return (
      <div className="set-password outer-div">
        {this.props.isGerman && <div className="german">german language</div>}
        {!this.props.isGerman && (<div>
          <div>Please set your password</div>
          <Form>
            <FormGroup>
              <Label for="useremail">Email:</Label>
              <Input type="email" name="useremail" id="useremail" value={this.state.useremail} onChange={this.handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="password">Password:</Label>
              <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange}/>
            </FormGroup>
          </Form>
          <Button onClick={(e)=>this.handleSubmit(e)}>Submit</Button>
        </div>
          
        )}
      </div>
    )
  }
}
