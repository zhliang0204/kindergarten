import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../../api';
import {Datetime} from 'react-datetime';

export default class CreateEvent extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:"",
      description:"",
      reqpersons: 1,
      reqhours: 1,
      started:'',
      ended:'',
      applybefore: "",
      resource:"",
      errors:{},
      errPos:0

    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  checkValue(){
    if(!(this.state.title && this.state.description && this.state.started && this.state.ended && this.state.applybefore)){
      let errors = {}
      if(!this.state.title){
        errors.title = true
      }
      if(!this.state.description){
        errors.description = true
      }
      if(!this.state.started){
        errors.started = true
      }
      if(!this.state.ended){
        errors.ended = true
      }
      if(!this.state.applybefore){
        errors.applybefore = true
      }
      this.setState({
        errors:errors
      })
      console.log(errors)
      return false
    }
    return true
  }

  checkDateValidation(){
    let timeDifferenceBeforeApply = 7 * 24 * 60 * 60 * 1000;
    console.log(this.state.started)

    console.log(this.state.started > this.state.ended)
    console.log(new Date(this.state.started).getTime() > timeDifferenceBeforeApply + new Date(this.state.applybefore).getTime())
    if(this.state.started > this.state.ended || new Date(this.state.started).getTime() > timeDifferenceBeforeApply + new Date(this.state.applybefore).getTime()){
      if(this.state.started > this.state.ended && new Date(this.state.started).getTime() > timeDifferenceBeforeApply + new Date(this.state.applybefore).getTime()){
        this.setState({
          errorPos:5
        })
      }
      else {
        if(this.state.started > this.state.end){
          this.setState({
            errorPos:1
          })
        } else {
          this.setState({
            errorPos:2
          })
        }
      }
      return false
    } 
    
    return true
    
  }

  handleCreate(){
    if( this.checkValue() && this.checkDateValidation()){
      let event = {
        title: this.state.title,
        description: this.state.description,
        reqpersons:this.state.reqpersons,
        reqhours:this.state.reqhours,
        started: this.state.started,
        ended:this.state.ended,
        applybefore: this.state.applybefore
      }
  
      
  
      console.log('---------event to create---------')
      console.log(event)
      api.createEvent(event)
          .then(res => {
            let cur = {
              role: api.getLocalStorageUser().role,
              title: res.title,
              id: res._id,
              eventState:res.eventState
            }
  
            let emailinfo = {
              newevent:cur
            };
  
            api.createEventMail(emailinfo)
            console.log(res)
            this.setState({
              title: '',
              description: '',
              reqpersons:0,
              reqhours:0,
              started: '',
              ended:'',
              applybefore:""
            })
            this.props.info.history.push("/events")
          })
    }
  }

  render() {
    return (
      <div className="Add-mission outer-div">
      <Form>
          <FormGroup className="inputtitle-type">
            <Label for="eventName">Task:</Label>
            {(this.state.errors.title) && (<div className="hint">please input title</div>)}
            <Input
              type="text"
              name="title"
              id="eventName"
              value={this.state.title}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>
          <FormGroup  className="inputtitle-type">
            <Label for="description">Description:</Label>
            {(this.state.errors.description) && (<div className="hint">please input description</div>)}

            <Input
              type="textarea"
              name="description"
              id="description"
              value={this.state.description}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>    

          {/* <FormGroup>
            <Label for="resource">Resource:</Label>
            <Input
              type="textarea"
              name="resource"
              id="resource"
              value={this.state.resource}
              onChange={(e) => this.handleInputChange(e)}
            />  
           </FormGroup>      */}

          <FormGroup  className="inputtitle-type">
            <Label for="reqpersons">Number of Persons:</Label>
            <Input
              type="number"
              name="reqpersons"
              id="reqpersons"
              value={this.state.reqpersons}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>
          <FormGroup  className="inputtitle-type">
            <Label for="reqhours">Number of Hours:</Label>
            <Input
              type="number"
              name="reqhours"
              id="reqhours"
              value={this.state.reqhours}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>
 

          <FormGroup  className="inputtitle-type">
            <Label for="startDate">Start Date:</Label>
            {(this.state.errors.started) && (<div className="hint">please input start date and time</div>)}

            <Input
              type="datetime-local"
              name="started"
              id="startDate"
              value={this.state.started}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>

         
          <FormGroup  className="inputtitle-type">
            <Label for="endedDate">End Date:</Label>
            {(this.state.errors.ended) && (<div className="hint">please input end date and time</div>)}
            {(this.state.errorPos === 1 || this.state.errorPos === 5) && (<div className="hint">please make sure ended date later than started date</div>)}
            <Input
              type="datetime-local"
              name="ended"
              id="endedDate"
              value={this.state.ended}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>

          <FormGroup  className="inputtitle-type">
            <Label for="applybefore">Apply Before:</Label>
            {(this.state.errors.applybefore) && (<div className="hint">please input applyBefore date and time</div>)}
            {(this.state.errorPos === 2 || this.state.errorPos === 5) && (<div className="hint">please left at least 7 days before started date</div>)}
            <Input
              type="datetime-local"
              name="applybefore"
              id="applybefore"
              value={this.state.applybefore}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormGroup>

          <div className="btn-click" onClick={() => this.handleCreate()}>Create</div>
        </Form>
        </div>
      
    )
  }
}
