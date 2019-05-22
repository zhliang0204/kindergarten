import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "./../../api";



export default class ActiveAccount extends Component {
  constructor(props){
    super(props)
    this.state={
      useremail:"",
      activeCode:"",
      isActive:false,
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
    let activeInfo = {
      email:this.state.useremail,
      activeCode: this.state.activeCode,
    }

    api.userActive(activeInfo)
        .then(res => {
          this.setState({
            isActive:true,
          })
        })

  }

  render() {
    return (
      <div className="user-active outer-div">
        {this.props.isGerman && <div className="german">german language</div>}
        {!this.props.isGerman && (<div>
          <div>Please input your email to active the account</div>
          <Form>
            <FormGroup>
              <Label for="useremail">Email:</Label>
              <Input type="email" name="useremail" id="useremail" value={this.state.useremail} onChange={this.handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="activeCode">Active Code:</Label>
              <Input type="text" name="activeCode" id="activeCode" value={this.state.activeCode} onChange={this.handleInputChange}/>
            </FormGroup>
          </Form>
          <Button onClick={(e)=>this.handleSubmit(e)}>Active</Button>
        </div>
        )}
      </div>
    )
  }
}
