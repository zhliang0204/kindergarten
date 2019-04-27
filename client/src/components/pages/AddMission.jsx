import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from './../../api';

export default class createMission extends Component {
  constructor(props){
    super(props)
    this.state = {
      eventname:"",
      content:"",
      reqpersons: 0,
      reqhours: 0,
      started:'',
      ended:'',

    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreate(){
    let event = {
      eventname: this.state.eventname,
      content: this.state.content,
      reqpersons:this.state.reqpersons,
      reqhours:this.state.reqhours,
      started: this.state.started,
      ended:this.state.ended,
    }

    console.log('---------event to create---------')
    console.log(event)
    api.createEvent(event)
        .then(res => {
          console.log(res)
          this.setState({
            eventname: '',
            content: '',
            reqpersons:0,
            reqhours:0,
            started: '',
            ended:'',
          })
        })
  }

  render() {
    return (
      <div className="Add-mission outer-div">
      <Form>
          <FormGroup>
            <Label for="eventName">Title</Label>
            <Input
              type="text"
              name="eventname"
              id="eventName"
              value={this.state.eventname}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventContent">Content</Label>
            <Input
              type="textarea"
              name="content"
              id="content"
              value={this.state.content}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>          

          <FormGroup>
            <Label for="reqpersons">Number of Persons</Label>
            <Input
              type="number"
              name="reqpersons"
              id="reqpersons"
              value={this.state.reqpersons}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="reqhours">Number of Hours</Label>
            <Input
              type="number"
              name="reqhours"
              id="reqhours"
              value={this.state.reqhours}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>
 

          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              name="started"
              id="startDate"
              value={this.state.started}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="endedDate">End Date</Label>
            <Input
              type="date"
              name="ended"
              id="endedDate"
              value={this.state.ended}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>

          <Button onClick={() => this.handleCreate()}>Create</Button>
        </Form>
        </div>
      
    )
  }
}
